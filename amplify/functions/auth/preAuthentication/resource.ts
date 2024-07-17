import { defineFunction } from "@aws-amplify/backend";

const preAuthentication = defineFunction({
  name: 'pre-authenication',
  environment: {
    LINE_IDENTITY_POOL_ID: 'us-east-1:35e7edb4-7bae-4c9e-a3eb-4a094021b954'
  }
})

export default preAuthentication