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
    questions: a.string().array(),
    order: a.integer().default(0)
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listResponseByLang').sortKeys(['order'])
  ]),
  Scenario: a.model({
    id: a.id().required(),
    scenario: a.string().required(),
    i18n: define.geti18n(),
    questionId: a.string(),
    question: a.belongsTo('Question', 'questionId'),
    order: a.integer().default(0)
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listScenarioByLang').sortKeys(['order']),
    index('questionId').queryField('listScenarioByQuestion')
  ]),
  Question: a.model({
    scenario: a.hasOne('Scenario', 'questionId'),
    response: a.string().array(),
    topicId: a.id().required(),
    topic: a.belongsTo('Topic', 'topicId')
  })
  .secondaryIndexes((index) => [
    index('topicId').queryField('listQuestionsByTopic')]
  ),
  Topic: a.model({
    title: a.string().required().default(''),
    questions: a.hasMany('Question', 'topicId'),
    i18n: define.geti18n(),
    order: a.integer().default(0).required()
  })
  .secondaryIndexes((index) => [
    index('i18n').queryField('listTopicsByLang').sortKeys(['order'])
  ])
})
.authorization(allow => [
  allow.authenticated().to(['read']),
  allow.groups(['admin', 'assessment_admin']),
  allow.publicApiKey()
])
