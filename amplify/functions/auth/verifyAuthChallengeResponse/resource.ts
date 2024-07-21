import { defineFunction } from "@aws-amplify/backend";

const verifyAuthChallengeResponse = defineFunction({
  name: 'verify-auth-challenge-response',
  environment: {
    LINE_IDENTITY_POOL_ID: 'us-east-1:35e7edb4-7bae-4c9e-a3eb-4a094021b954',
    LIFF_ID: '2004822790',
    LIFF_SECRECT: '60fe82b27911c81d69f0c8c2fcaf90cf'
  }
})

export default verifyAuthChallengeResponse