import { generateClient } from 'aws-amplify/data'
import type { SchemaAssessmentTopic } from 'amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'

Amplify.configure(outputs)

const topic1 = {
  title: '與過去、未來、他人無關，我此時此刻的狀態',
  order: 1
}
const topic2 = {
  title: '與過去、未來、他人無關，什麼狀態我會有安全感',
  order: 2
}
const topic3 = {
  title: '與過去、未來、他人無關，什麼狀態我會有成就感',
  order: 3
}
const topic4 = {
  title: '與過去、未來、他人無關，我想實踐並傳達的使命',
  order: 4
}
const scenarios1 = [
  { scenario: '我重視自己的看法和決定，能夠說自己想說的話、做自己想做的事。' },
  { scenario: '我能夠清晰的感受到別人的情緒和氛圍，容易和所有人事物的反應有共鳴。' },
  { scenario: '我對任何新鮮、感覺有趣的人事物，都會產生想要了解或嘗試的好奇心。' },
  { scenario: '我一旦興起了想要獲得的念頭，就會盡量去行動，直到我實質收穫為止。' },
  { scenario: '我對需要遵循的原則敏銳，做人做事都會要求自己要維持相當的品質。' },
  { scenario: '我願意冒險和創新，常常都在想自己能不能有更好的說法、做法、資源和願景。' },
  { scenario: '我做事時會多方評估、運用邏輯分析預判風險，凡事必須謹慎設想周全、表現專業。' },
  { scenario: '我有企圖心，願意成為鎖定目標後，不斷擴張發展，能夠被委以重任的人。' },
  { scenario: '我常常回想事情的過程，自省有什麼可以改善的地方，是否有照顧到別人的需求。' },
  { scenario: '我看待人事物，會依照不同角度和立場來思考，避免先入為主，盡量囊括所有可能性。' }
]
const scenarios2 = [
  { scenario: '一定要眼見為憑我才會確定，別人轉述我自己沒看過、沒體驗過的，我不會輕易認同。' },
  { scenario: '我需要有人陪伴，靜靜在我身邊或同一個空間，我知道有熟人在，我就能安心放鬆。' },
  { scenario: '給我自由，讓我自己摸索不綁手綁腳，反而能發揮更多的可能性，別給我太多限制。' },
  { scenario: '只要有錢，窩在家裡最舒服！安穩最棒了，戶頭裡存款的數字就是我心情的幅度。' },
  { scenario: '一切必須有SOP，沒有原則怎麼公平？沒有自律哪來穩定？沒有道德和品味是不行的。' },
  { scenario: '我決定的事，只要有人願意支持、肯定我，就算沒有任何實質幫助，我都能熱血沸騰。' },
  { scenario: '必須充分收集資料和研究，沒計畫的行動就是飛蛾撲火，我決不做沒效益又吃虧的事。' },
  { scenario: '當我站上舞台，所有人都為我喝采！這酥麻的感覺太療癒了，聚光燈就是我的舒適圈。' },
  { scenario: '我身邊的人都被安置妥當，我才能鬆一口氣，所有人都安穩，我就會真正快樂幸福。' },
  { scenario: '在任何狀態和場合，我都能心安理得，自得其樂，無招勝有招，越輕盈轉換就越簡單。' }
]
const scenarios3 = [
  { scenario: '只要我自己決定的，無論當領袖主導號召，或是當跟隨者服務所有人，我都很享受。' },
  { scenario: '有人願意釋放情緒和不安，我可以分享溫暖給他，支持他重獲力量，我就覺得很值得。' },
  { scenario: '當我全場飛舞的炒熱氣氛，讓大家一起笑笑鬧鬧加深感情，提升凝聚力，我真的超棒。' },
  { scenario: '有人明白我不善表達，願意理解我努力的做，就是在用行動證明我的心意，我滿足了。' },
  { scenario: '養成自律的好習慣，不被擔心就不被束縛，被人信任和尊重的感覺，真是舒心自在。' },
  { scenario: '燃燒戰鬥故我在，沒有挑戰性的人生怎麼算活著！突破常規後得到成就，最讓人痛快。' },
  { scenario: '凡事都仔細尋找問題，找到解決方法，反覆深掘除錯，把失誤率最小化，很紓壓。' },
  { scenario: '當我發表自己的意見，所有人都認同，而且願意跟我一起打拼追夢，我就充滿動力。' },
  { scenario: '0.01的進步也是進步，有人因我的一句話或行為，改變他的所思所想，我功德圓滿了。' },
  { scenario: '當下就是完整，想開始就開始，想休息就休息，我隨性自在，一切都值得而且配得。' }
]
const scenarios4 = [
  { scenario: '人不為己天誅地滅，全世界的人都把自己權利顧好，天下自然太平，愛惜自己萬萬歲。' },
  { scenario: '人都有會感受，在意別人的眼光很正常！代表我們有同理心，高敏細膩是很有力量的。' },
  { scenario: '開心就會笑、難過就會哭！我們與生俱來的天賦和學習力，能夠讓生活精彩又有價值。' },
  { scenario: '經營關係不要害怕談清楚利益，餓了吸空氣是不會飽的，實質獲得是穩定互信的基礎。' },
  { scenario: '凡事都按部就班的讓自己穩定踏實，清楚明白自己的想法，就能擁有強大的選擇權。' },
  { scenario: '誰做不到、做的到，都跟你沒關係，自己試了才知道結果，親身體驗是獨一無二的。' },
  { scenario: '冷靜不是無情，穩定心情來面對問題，是離幸福更近的途徑，假裝滿足才會遠離幸福。' },
  { scenario: '人都值得偉大，別擔心丟臉，享受展現的人最有魅力，要做就做大的，沒有極限。' },
  { scenario: '氛圍是循環的，只要有一個人不快樂，所有人就無法真的幸福，一起推動善良的信念。' },
  { scenario: '人人都是借鏡和榜樣，看別人想想自己，看自己想想別人，用彼此的故事萃取智慧。' }
]
const responses = [
  { state: '我就是', degree: '很擅長' },
  { state: '我認同', degree: '能做到' },
  { state: '我可以', degree: '但不愛' },
  { state: '我渴望', degree: '嘗試中' },
  { state: '我想要', degree: '但無法' },
  { state: '我沒有', degree: '也沒差' },
  { state: '我不是', degree: '很抗拒' }
]

const doSomething = async () => {
  // await doSignIn()

  const clientAssessmentTopic = generateClient<SchemaAssessmentTopic>({
    authMode: 'apiKey'
  })
  const responseResult = (await clientAssessmentTopic.models.Response.list()).data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const topicResult = (await clientAssessmentTopic.models.Topic.list()).data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const responseIds: string[] = responseResult.map((response) => response.id)
  for (const topic of topicResult) {
    const questionsOfTopic: string[] = []
    for (let i = 0; i < 10; i++) {
      const question =  (await clientAssessmentTopic.models.Question.create({
        topicId: topic.id,
        response: responseIds
      })).data
      if (question) {
        questionsOfTopic.push(question.id)
      }
    }
    if (questionsOfTopic.length === 10) {
      for (const response of responseResult) {
        clientAssessmentTopic.models.Response.update({
          id: response.id,
          questions: questionsOfTopic
        })
      }
    }
  }
  // const scenarios4Result = await Promise.all(scenarios4.map(async (scenarioData, index) => {
  //   return (await clientAssessmentTopic.models.Scenario.create({
  //     scenario: scenarioData.scenario,
  //     order: index
  //   })).data
  // }))
  // for (const scenarioData of scenarios4Result) {
  //   for (const responseData of responseResult) {
  //     await clientAssessmentTopic.models.Question.create({
  //       topicId: topicResult[3].id,
  //       scenarioId: scenarioData!.id,
  //       responseId: responseData!.id
  //     })
  //   }
  // }
  console.log('handle topic2 done')

  // const scenario1 = ((await question1[0].scenario()).data)
  // console.log(scenario1?.scenario)
  // const scenario35 = ((await question1[34].scenario()).data)
  // console.log(scenario35?.scenario)
  // const scenario50 = ((await question1[49].scenario()).data)
  // console.log(scenario50?.scenario)
  // const response50 = ((await question1[49].response()).data)
  // console.log(`${response50?.degree}, ${response50?.state}`)

  // const scenario51 = ((await question1[50].scenario()).data)
  // console.log(scenario51?.scenario)
  // const response51 = ((await question1[50].response()).data)
  // console.log(`${response50?.degree}, ${response51?.state}`)
}

doSomething()