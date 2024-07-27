import { type ClientSchema, defineData } from '@aws-amplify/backend'
import { schemaTopic } from './assessment/topics'
import { schemaFormPost } from './assessment/formPost'

export type SchemaAssessmentTopic = ClientSchema<typeof schemaTopic>
export type SchemaAssessmentForm = ClientSchema<typeof schemaFormPost>

export const data = defineData({
  schema: {
    schemas: [schemaTopic, schemaFormPost]
  }, 
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
})