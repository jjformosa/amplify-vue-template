import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// const { cfnUserPool } = backend.auth.resources.cfnResources
// if (Array.isArray(cfnUserPool.schema)) {
//   cfnUserPool.schema.push({
//     name: 'birthday',
//     attributeDataType: 'String',
//     developerOnlyAttribute: false
//   })
// }

// backend.addOutput({
//   auth: {
//     'aws_region': 'us-east-1',
//     'user_pool_id': 'us-east-1_W2eOnMevj',
//     'user_pool_client_id': '48q7ujh2ad84qmdpqvntd485k',
//     'identity_pool_id': 'us-east-1:4b566e85-e5b3-4d13-ae68-0fce25b6bc6-4d13-ae68-0fce25b6bc61',
//     "standard_required_attributes": [
//       "email"
//     ],
//     "username_attributes": [
//       "email"
//     ],
//     "user_verification_types": [
//       "email"
//     ],
//     "password_policy": {
//       "min_length": 8,
//       "require_numbers": true,
//       "require_lowercase": true,
//       "require_uppercase": true,
//       "require_symbols": true
//     },
//     "unauthenticated_identities_enabled": true
//   }
// })