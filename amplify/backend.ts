import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'

const backend = defineBackend({ auth, data })
// backend.addOutput({
//   auth: {
//     aws_region: 'us-east-1',
//     user_pool_id: 'us-east-1_ma6Z4eYvY',
//     user_pool_client_id: '1t4mbh3q1imfjm9sjp5qk4lm73',
//     identity_pool_id: 'us-east-1:14c097d0-ec5e-45a2-b86e-d219d6507964',
//     username_attributes: ['username'],
//     standard_required_attributes: ['email', 'profile', 'name'],
//     user_verification_types: ['email']
//   }
  // , data: {
  //   aws_region: 'us-east-1',
  //   url: 'https://siovov5fjfdarcgnbrpjepubvu.appsync-api.us-east-1.amazonaws.com/graphql',
  //   api_key: 'igiqg2cvdfcn7kcszi4gj6q3ay',
  //   model_introspection: data
  // }
// })
