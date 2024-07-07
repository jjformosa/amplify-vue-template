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
          clientId: secret('2004822790'),
          clientSecret: secret('60fe82b27911c81d69f0c8c2fcaf90cf'),
          issuerUrl:'https://access.line.me/',
          scopes: ['email', 'profile',  'openid']
        }
      ],
      callbackUrls: ['http://localhost:9000', 'https://in-seen.tsaipanmwws.name'],
      logoutUrls:['http://localhost:9000', 'https://in-seen.tsaipanmwws.name']
    }
  }
});