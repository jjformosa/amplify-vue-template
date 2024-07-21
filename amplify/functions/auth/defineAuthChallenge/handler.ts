import { type DefineAuthChallengeTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { printEachOfStringMap } from '../../utils'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: DefineAuthChallengeTriggerHandler = async (event) => {
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
  const filterParams = {
    UserPoolId: userPoolId,
    AttributesToGet: ['email'],
    Filter: `email = "${email}"`
  }
  if (event.request.session.length === 0) {
    // 第一次進入挑戰流程
    event.response.issueTokens = false
    event.response.failAuthentication = false
    event.response.challengeName = 'CUSTOM_CHALLENGE'
  } else {
      const lastChallenge = event.request.session.slice(-1)[0]
      if (lastChallenge.challengeName === 'CUSTOM_CHALLENGE' && lastChallenge.challengeResult === true) {
          // 成功通過挑戰
          event.response.issueTokens = true
          event.response.failAuthentication = false
      } else {
          // 失敗或再次挑戰
          event.response.issueTokens = false
          event.response.failAuthentication = true
      }
  }
  return event
}