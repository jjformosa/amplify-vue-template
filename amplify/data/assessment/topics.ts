import { a } from '@aws-amplify/backend'
import * as define from '../define'

/**
 * id: a.id(), //default by model
 * createdAt, // default by model
 * updatedAt, // default by model
 */

// export const TypeScenario = a.customType({
//   scenario: a.string().required(),
//   i18n: define.geti18n()
// })

// export const TypeResponse = a.customType({
//   state: a.string().required(),
//   degree: a.string().required(),
//   i18n: define.geti18n()
// })

// export const TypeTopic = a.customType({
//   title: a.string().required(),
//   i18n: define.geti18n()
// })

export const schemaTopic = a.schema({
  Response: a.model({
    state: a.string().required(),
    degree: a.string().required(),
    i18n: define.geti18n().required(),
    question: a.hasMany('Question', 'responseId')
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listResponseByLang')
  ]),
  Scenario: a.model({
    id: a.id().required(),
    scenario: a.string().required(),
    i18n: define.geti18n(),
    question: a.hasOne('Question', 'scenarioId')
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listScenarioByLang'),
  ]),
  Question: a.model({
    scenarioId: a.id().required(),
    scenario: a.belongsTo('Scenario', 'scenarioId'),
    responseId: a.id().required(),
    response: a.belongsTo('Response', 'responseId'),
    topicId: a.id().required(),
    topic: a.belongsTo('Topic', 'topicId')
  })
  .secondaryIndexes((index) => [
    index('topicId').queryField('listQuestionsByTopic'),
    index('scenarioId').queryField('listQuestionsByScenario'),
    index('responseId').queryField('listQuestionsByResponse')]
  ),
  Topic: a.model({
    title: a.string().required().default(''),
    questions: a.hasMany('Question', 'topicId'),
    i18n: define.geti18n(),
    order: a.integer().default(0).required()
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listTopicsByLang').sortKeys(['order'])
  ]),
})
.authorization(allow => [
  allow.authenticated().to(['read']),
  allow.groups(['admin', 'assessment_admin']),
  allow.publicApiKey()
])
