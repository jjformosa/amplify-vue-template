import { a, defineData } from '@aws-amplify/backend'
import * as define from '../define'
// import { TypeScenario, TypeResponse, TypeTopic } from './topics'

/**
 * id: a.id(), //default by model
 * createdAt, // default by model
 * updatedAt, // default by model
 */

export const schemaFormPost = a.schema({
  FormResponse: a.customType({
    id: a.id().required(),
    state: a.string().required(),
    degree: a.string().required()
  }),
  FormScenario: a.customType({
    id: a.id().required(),
    scenario: a.string().required()
  }),
  FormQuestion: a.customType({
    id: a.id().required(),
    scenario: a.ref('FormScenario'),
    responses: a.ref('FormResponse').array(),
  }),
  Part1Answer: a.customType({
    questionId: a.id().required(),
    responseId: a.id().array(),
  }),
  Part2Answer: a.customType({
    questionId: a.id().required(),
    scenarioId: a.json(),
  }),
  FormTopic: a.customType({
    id: a.id().required(),
    title: a.string(),
    questions: a.ref('FormQuestion').array(),
    part1: a.ref('Part1Answer').array(),
    part2: a.ref('Part2Answer').array()
  }),
  AssessmentForm: a.model({
    topic: a.ref('FormTopic').array(),
    i18n: define.geti18n()
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listByLang')]
  ),
})
.authorization(allow => [
  allow.groups(['customer_service_admin', 'admin']).to(['read']),
  allow.groupDefinedIn('assessor').to(['read']),
  allow.owner().to(['read']),
  allow.groupDefinedIn('assessee')
])
