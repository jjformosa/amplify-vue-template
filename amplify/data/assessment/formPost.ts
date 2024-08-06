import { a } from '@aws-amplify/backend'
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
    degree: a.string().required(),
    order: a.integer()
  }),
  FormScenario: a.customType({
    id: a.id().required(),
    scenario: a.string().required(),
    order: a.integer()
  }),
  FormQuestion: a.customType({
    id: a.id().required(),
    scenario: a.ref('FormScenario'),
    responses: a.ref('FormResponse').array(),
  }),
  Part1Answer: a.customType({
    scenarioId: a.string().required(),
    responseId: a.string().required(),
  }),
  Part2Answer: a.customType({
    scenarioId: a.string().array(),
  }),
  FormTopic: a.customType({
    id: a.id().required(),
    title: a.string(),
    order: a.integer(),
    questions: a.ref('FormQuestion').array(),
    part1: a.ref('Part1Answer').array(),
    part2: a.ref('Part2Answer').array()
  }),
  AssessmentForm: a.model({
    topic: a.ref('FormTopic').array(),
    i18n: define.geti18n(),
    isCompleted: a.boolean().default(false),
    assessor: a.string().array(),
    assessee: a.string()
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listByLang')]
  ),
})
.authorization(allow => [
  allow.groups(['customer_service_admin', 'admin']).to(['read']),
  allow.ownersDefinedIn('assessor').to(['read']),
  allow.owner().to(['read']),
  allow.ownerDefinedIn('assessee')
])
