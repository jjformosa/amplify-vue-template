import { a } from '@aws-amplify/backend'
import { geti18n } from '../define'

const schema = a.schema({
  EnumContentType: a.enum(['topic', 'scenario', 'response']),
  item: a.model({
    pk: a.string().required(),
    sk: a.string().required(), // sort key

    // Data attributes
    i18n: geti18n().required(),
    type: a.ref('EnumContentType').required(),
    id: a.id().required(),
    topicTitle: a.string(),   // for topic { title: string }
    scenario: a.string(),     // for scenario { scenario: string }
    responseState: a.string(), // for response { state: string, degree: string }
    responseDegree: a.string()
  })
})