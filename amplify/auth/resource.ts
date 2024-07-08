import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: 'liff-test',
          clientId: secret('line-login-id'),
          clientSecret: secret('line-login-secret'),
          issuerUrl:'https://access.line.me/',
          scopes: ['email', 'profile',  'openid']
        }
      ],
      callbackUrls: ['http://localhost:9000', 'https://in-seen.tsaipanmwws.name'],
      logoutUrls:['http://localhost:9000', 'https://in-seen.tsaipanmwws.name']
    }
  }
});