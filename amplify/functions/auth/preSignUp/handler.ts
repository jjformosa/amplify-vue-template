import { 
  type PreSignUpTriggerHandler,
  type PreSignUpTriggerEvent } from 'aws-lambda'
import AWS from 'aws-sdk'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

export const handler: PreSignUpTriggerHandler = async (event: PreSignUpTriggerEvent) => {
  console.log(event.callerContext.clientId)
  console.log(event.triggerSource)
  console.log(event.userName)
  console.log(event.userPoolId)
  try {
    const attributes = event.request.userAttributes
    console.log(`sttributes: ${attributes}`)
    const clientMetadata = event.request.clientMetadata ?? {}
    console.log(`clientMetadata: ${clientMetadata}`)
    const validationData = event.request.validationData ?? {}
    console.log(`validationData: ${validationData}`)
    const email = attributes.email
    const filterParams = {
      UserPoolId: event.userPoolId,
      AttributesToGet: ['email'],
      Filter: `email = "${email}"`
    }
    const listUsersResponse = await cognitClient.listUsers(filterParams).promise()
    if (listUsersResponse.Users && listUsersResponse.Users!.length > 0) {
      // TODO 切換provider?
      let provider = 'line', provider_id = ''
      if (event.userName.startsWith('Facebook')) provider = 'Facebook', provider_id = ''
      else if (event.userName.startsWith('Google')) provider = 'Google', provider_id = ''
      // TODO 覆寫attributes
      // 如果用戶已存在，則更新其identities屬性
      const existingUser = listUsersResponse.Users[0]
      const existingSub = existingUser.Username ?? email

      const updateUserAttributesParams = {
        UserPoolId: event.userPoolId,
        Username: existingSub,
        UserAttributes: [
          {
            Name: 'identities',
            Value: event.request.userAttributes.identities
          }
        ]
      }
      await cognitClient.adminUpdateUserAttributes(updateUserAttributesParams).promise()

      // 自動確認和驗證用戶
      event.response.autoConfirmUser = true
      event.response.autoVerifyEmail = true
      console.log(`find exist user: ${email}, userStatus ${existingUser.UserStatus ?? 'unkown'}`)
    }
  } catch (ex) {
    console.log(`preSignUp error: ${ex}`)
  }
  return event
}
