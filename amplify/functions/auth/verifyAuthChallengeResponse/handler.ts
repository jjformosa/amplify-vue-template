import { type VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { verifyAccessTokenWithLiff } from '../line'
import { printEachOfStringMap } from '../../utils'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
  // if (event.request.clientMetadata) {  // Can Get it
  //   printEachOfStringMap(event.request.clientMetadata, 'clientMetadata')
  // }
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
  const accesstoken = event.request.clientMetadata!.accesstoken
  const email = event.request.challengeAnswer
  event.response.answerCorrect = await verifyAccessTokenWithLiff(accesstoken, { email })
  return event
}