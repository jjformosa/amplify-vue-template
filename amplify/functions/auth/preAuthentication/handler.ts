import { type PreAuthenticationTriggerHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { type SignUpInputWithLiff, type IdentitySource } from '../line'

const cognitClient = new AWS.CognitoIdentityServiceProvider()

const signUpWithLine = async (signUpInputWithLiff: SignUpInputWithLiff): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> => {
  const signUpInput: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
    ClientId: signUpInputWithLiff.clientId,
    Username: signUpInputWithLiff.clientId,
    Password: '1qaz@wsx!', // TODO MFA
    UserAttributes: [
      { Name: 'email', Value: signUpInputWithLiff.email },
      { Name: 'name', Value: signUpInputWithLiff.name },
      { Name: 'picture', Value: signUpInputWithLiff.picture },
      { Name: 'custom:line_access_token', Value: signUpInputWithLiff.accesstoken },
      { Name: 'custom:line_id_token', Value: signUpInputWithLiff.idToken }
    ]
  }
  const signUpResult = await cognitClient.signUp(signUpInput).promise()
  console.log('signUpResult')
  console.log(signUpResult)
  return signUpResult
}

export const handler: PreAuthenticationTriggerHandler = async (event) => {
  console.log(event.request.validationData)
  console.log(event.request.clientMetadata)
  console.log(event.request.userAttributes)
  console.log(event.triggerSource)

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
    if (userName.startsWith('Facebook')) provider = 'Facebook', provider_id = ''
    else if (userName.startsWith('Google')) provider = 'Google', provider_id = ''
    
    console.log(`find exist user: ${email}`)
  } else {
    // 檢查資料並註冊
    const clientMetadata = event.request.clientMetadata!
    const identitySource = clientMetadata['identitySource'] as IdentitySource
    let signUpResponse: AWS.CognitoIdentityServiceProvider.SignUpResponse | null = null
    switch(identitySource) {
      case 'liff':
        // TODO verify with sub, aud, iss, accesstoken or idToken
        const signUpWithLiff: SignUpInputWithLiff = {
          clientId: clientMetadata['sub'],
          email: clientMetadata['email'],
          name: clientMetadata['name'],
          picture: clientMetadata['picture'],
          accesstoken: clientMetadata['accesstoken'],
          idToken: clientMetadata['idToken']
        }
        signUpResponse = await signUpWithLine(signUpWithLiff)
        break
    }
    if (signUpResponse) {
      console.log(`register user: ${email}, ${signUpResponse.UserSub}`)
    } else {
      // TODO handle error
    }
  }
  return event
}