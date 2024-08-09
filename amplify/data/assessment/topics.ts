import { a, defineFunction } from '@aws-amplify/backend'
import * as define from '../define'

/**
 * id: a.id(), //default by model
 * createdAt, // default by model
 * updatedAt, // default by model
 */

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
  ]),
  ListResponsesByQuestion: a.query()
  .arguments({ questionId: a.string().required() })
  .returns(a.ref('Response').array())
  .authorization(allow => [
    allow.publicApiKey(), 
    allow.authenticated()
  ])
  .handler(a.handler.custom({
    dataSource: a.ref('Response'),
    entry: '../../functions/data/ListResponsesByQuestion.js'
  }))
})
.authorization(allow => [
  allow.authenticated().to(['read']),
  allow.groups(['admin', 'assessment_admin']),
  allow.publicApiKey()
])
