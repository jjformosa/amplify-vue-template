import { type VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { type SignUpInputWithLiff, type IdentitySource } from '../line'
import { printEachOfStringMap } from '../../utils'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
  if (event.request.clientMetadata) {
    printEachOfStringMap(event.request.clientMetadata, 'clientMetadata')
  }
  printEachOfStringMap(event.request.userAttributes, 'userAttributes')
  console.log(event.request.userNotFound ?? 'not found')
  console.log(event.triggerSource)
  console.log(event.callerContext)
  console.log(event.request.challengeAnswer)

  if (event.request.challengeAnswer === event.request.privateChallengeParameters.answer) {
      event.response.answerCorrect = true
  } else {
      event.response.answerCorrect = false
  }
  return event
}