import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

defineBackend({
  auth,
  data,
});

// const backend = defineBackend({
//   data
// })

// backend.addOutput({
//   auth: {
//     'aws_region': 'us-east-1',
//     'user_pool_id': 'us-east-1_W2eOnMevj',
//     'user_pool_client_id': '48q7ujh2ad84qmdpqvntd485k',
//     'identity_pool_id': 'us-east-1:4b566e85-e5b3-4d13-ae68-0fce25b6bc6-4d13-ae68-0fce25b6bc61',
//     'username_attributes': ['email'],
//     'standard_required_attributes': ['email'],
//     'user_verification_types': ['email'],
//     'unauthenticated_identities_enabled': false,
//   }
// })