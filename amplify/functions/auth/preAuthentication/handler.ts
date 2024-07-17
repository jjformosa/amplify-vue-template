import { type PreAuthenticationTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: PreAuthenticationTriggerHandler = async (event) => {
  const userPoolId = event.userPoolId
  const userName = event.userName
  const userAttributes = event.request.userAttributes
  const email = userAttributes.email
  const filterParams = {
    UserPoolId: userPoolId,
    AttributesToGet: ['email'],
    Filter: `email = "${email}"`
  }
  const listUsersResponse = await cognitClient.listUsers(filterParams).promise()
  if (listUsersResponse.Users && listUsersResponse.Users!.length > 0) {
    let provider = 'line', provider_id = ''
    if (event.userName.startsWith('Facebook')) provider = 'Facebook', provider_id = ''
    else if (event.userName.startsWith('Google')) provider = 'Google', provider_id = ''

    // 自動確認和驗證用戶
    // event.response = {
    //   autoConfirmUser: true,
    //   autoVerifyEmail: true
    // }
    console.log(event.request.validationData)
    console.log(event.request.clientMetadata)
    console.log(`find exist user: ${email}`)
  }
  return event
};