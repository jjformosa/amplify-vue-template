import { defineAuth, secret } from '@aws-amplify/backend'
import preAuthentication from '../functions/auth/preAuthentication/resource'

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: 'liff-test',
          clientId: secret('line-login-id'),
          clientSecret: secret('line-login-secret'),
          issuerUrl:'https://access.line.me',
          scopes: ['email', 'profile', 'openid']
        }
      ],
      callbackUrls: ['http://localhost:5173', 'https://localhost:9000/', 'https://in-seen.tsaipanmwws.name/'],
      logoutUrls:['http://localhost:5173', 'https://localhost:9000/', 'https://in-seen.tsaipanmwws.name/']
    }
  },
  triggers: {
    preAuthentication: preAuthentication
  }
})