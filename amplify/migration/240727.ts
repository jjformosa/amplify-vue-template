import doSignIn from "./adminAuth"
import { generateClient } from 'aws-amplify/data'
import type { SchemaAssessmentTopic } from '../data/resource'

const doSomething = async () => {
  await doSignIn()

  const clientAssessmentTopic = generateClient<SchemaAssessmentTopic>()
  
  const listResposne = (await clientAssessmentTopic.models.Response.list()).data
  const listTopic = (await clientAssessmentTopic.models.Topic.list()).data
  let scenarioQuery = null, listScenario = null, scenarioNextToken = null
  scenarioQuery = await clientAssessmentTopic.models.Scenario.list({
    limit: 10
  })
  listScenario = scenarioQuery.data
  scenarioNextToken = scenarioQuery.nextToken
  for (const topicIndex in listTopic) {
    const _topic = listTopic[topicIndex]
    for (const scenarioIndex in listScenario) {
      const _scenario = listScenario[scenarioIndex]
      const _question = (await clientAssessmentTopic.models.Question.create({
        topicId: _topic.id
      })).data
      if (_question) {
        await clientAssessmentTopic.models.Scenario.update({
          id: _scenario.id,
          questionId: _question.id
        })
        for (const responseIndex in listResposne) {
          const _response = listResposne[responseIndex]
          await clientAssessmentTopic.models.Response.update({
            id: _response.id,
            questionId: _question.id
          })
        }
      }
    }
    break
  }
}

doSomething()