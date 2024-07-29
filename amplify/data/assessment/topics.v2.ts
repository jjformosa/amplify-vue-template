import { a } from '@aws-amplify/backend'
import { geti18n } from '../define'

const schema = a.schema({
  EnumContentType: a.enum(['topic', 'scenario', 'response']),
  Topic: a.model({
    pk: a.string().required(),
    sk: a.string().required(), // sort key

    // Data attributes
    i18n: geti18n().required(),
    type: a.ref('EnumContentType'),
    id: a.id().required(),
    topicTitle: a.string(),
    scenario: a.string(),
    responseStaate: a.string(),
    responseDegree: a.string()
  })
})