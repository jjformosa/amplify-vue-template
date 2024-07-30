import { type VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { verifyAccessTokenWithLiff } from '../line'
import { printEachOfStringMap } from '../../utils'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
  // if (event.request.clientMetadata) {  // Can Get it
  //   printEachOfStringMap(event.request.clientMetadata, 'clientMetadata')
  // }
  const identitySource = event.request.clientMetadata?.identitySource ?? ""
  // printEachOfStringMap(event.request.userAttributes, 'userAttributes')
  // console.log(event.request.userNotFound ?? 'not found')  // true
  // console.log(event.triggerSource)  // VerifyAuthChallengeResponse_Authentication
  // console.log(event.callerContext)
  // console.log(event.request.challengeAnswer)  // from amplify confirmSignIn.challengeResponse
  
  // if (event.request.challengeAnswer === event.request.privateChallengeParameters.answer) {
  //     event.response.answerCorrect = true
  // } else {
  //     event.response.answerCorrect = false
  // }
  let email, verifyResponse
  const access_token = event.request.clientMetadata?.accesstoken ?? ''
  if (identitySource === 'liff' && event.request.challengeAnswer === 'CUSTOM_CHALLENGE') {
    email = event.request.challengeAnswer
    const [response, errMsg] = await verifyAccessTokenWithLiff(access_token, { email })
    if (errMsg) {
      console.log(`login api fail: ${errMsg}`)
      event.response.answerCorrect = false
      return event
    }
    verifyResponse = response
  }
  if (verifyResponse && email) {
    // 先檢查email是否存在，不存在要幫使用者註冊
    const filterParams = {
      UserPoolId: event.userPoolId,
      AttributesToGet: ['email'],
      Filter: `email = "${email}"`
    }
    const listUsersResponse = await cognitClient.listUsers(filterParams).promise()
    if (!listUsersResponse.Users || listUsersResponse.Users!.length === 0) {
      // TOOD 用正緣觸發
      const { name, picture } = event.request.clientMetadata!
      const signUpResponse = await cognitClient.adminCreateUser({
        UserPoolId: event.userPoolId,
        Username: email,
        TemporaryPassword: '2wsx!QAZ',
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'name', Value: name },
          { Name: 'picture', Value: picture }
        ],
        ClientMetadata: {
          identitySource
        }
      }).promise()
      console.log(`sign up resposne: ${signUpResponse}`)
    }
    event.response.answerCorrect = true
  } else {
    event.response.answerCorrect = false
  }
  return event
}