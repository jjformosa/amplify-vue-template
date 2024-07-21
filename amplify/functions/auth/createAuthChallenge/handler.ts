import { type CreateAuthChallengeTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { printEachOfStringMap } from '../../utils'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: CreateAuthChallengeTriggerHandler = async (event) => {
  if (event.request.clientMetadata) {
    printEachOfStringMap(event.request.clientMetadata, 'clientMetadata')
  }
  printEachOfStringMap(event.request.userAttributes, 'userAttributes')
  console.log(event.request.userNotFound ?? 'not found')
  console.log(event.triggerSource)
  console.log(event.callerContext)
  console.log('session')
  event.request.session.forEach((value) => {
    console.log(value)
  })

  const userPoolId = event.userPoolId
  const userName = event.userName
  const userAttributes = event.request.userAttributes
  const email = userAttributes.email
  if (event.request.challengeName === 'CUSTOM_CHALLENGE') {
    event.response.publicChallengeParameters = { question: 'What is your favorite color?' };
    event.response.privateChallengeParameters = { answer: 'blue' };
    event.response.challengeMetadata = 'CUSTOM_CHALLENGE';
  }
  return event
}