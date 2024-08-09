import { generateClient } from 'aws-amplify/data'
import type { SchemaAssessmentTopic } from 'amplify/data/resource'
import { Amplify } from 'aws-amplify'
// import outputs from '../../amplify_outputs.json'

const outputs = {
  "auth": {
    "user_pool_id": "us-east-1_YaB5e8hqy",
    "aws_region": "us-east-1",
    "user_pool_client_id": "2qfs89t652us3rufq1o5m31h9s",
    "identity_pool_id": "us-east-1:dbdfb6a3-efc2-4db2-bb08-f7b291c39505",
    "standard_required_attributes": [
      "email"
    ],
    "username_attributes": [
      "email"
    ],
    "user_verification_types": [
      "email"
    ],
    "password_policy": {
      "min_length": 8,
      "require_numbers": true,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_symbols": true
    },
    "oauth": {
      "identity_providers": [
        "liff-test"
      ],
      "redirect_sign_in_uri": [
        "http://localhost:5173",
        "https://localhost:9000/",
        "https://in-seen.tsaipanmwws.name/"
      ],
      "redirect_sign_out_uri": [
        "http://localhost:5173",
        "https://localhost:9000/",
        "https://in-seen.tsaipanmwws.name/"
      ],
      "response_type": "code",
      "scopes": [
        "phone",
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      "domain": "68e6dd2bcc252d0c79d4.auth.us-east-1.amazoncognito.com"
    },
    "unauthenticated_identities_enabled": true
  },
  "data": {
    "url": "https://hls2gamjvzdc5ejvo6ch7brw6a.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_region": "us-east-1",
    "api_key": "da2-o45lmgcqundt5iqpe4grfb6yme",
    "default_authorization_type": "AMAZON_COGNITO_USER_POOLS",
    "authorization_types": [
      "API_KEY",
      "AWS_IAM"
    ],
    "model_introspection": {
      "version": 1,
      "models": {
        "Response": {
          "name": "Response",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "state": {
              "name": "state",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "degree": {
              "name": "degree",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "i18n": {
              "name": "i18n",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "questionId": {
              "name": "questionId",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "question": {
              "name": "question",
              "isArray": false,
              "type": {
                "model": "Question"
              },
              "isRequired": false,
              "attributes": [],
              "association": {
                "connectionType": "BELONGS_TO",
                "targetNames": [
                  "questionId"
                ]
              }
            },
            "order": {
              "name": "order",
              "isArray": false,
              "type": "Int",
              "isRequired": false,
              "attributes": []
            },
            "createdAt": {
              "name": "createdAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            },
            "updatedAt": {
              "name": "updatedAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            }
          },
          "syncable": true,
          "pluralName": "Responses",
          "attributes": [
            {
              "type": "model",
              "properties": {}
            },
            {
              "type": "key",
              "properties": {
                "name": "responsesByI18nAndOrder",
                "queryField": "listResponseByLang",
                "fields": [
                  "i18n",
                  "order"
                ]
              }
            },
            {
              "type": "key",
              "properties": {
                "name": "responsesByQuestionId",
                "queryField": "listResponseByQuestion",
                "fields": [
                  "questionId"
                ]
              }
            },
            {
              "type": "auth",
              "properties": {
                "rules": [
                  {
                    "allow": "private",
                    "operations": [
                      "read"
                    ]
                  },
                  {
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "groups": [
                      "admin",
                      "assessment_admin"
                    ],
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  },
                  {
                    "allow": "public",
                    "provider": "apiKey",
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  }
                ]
              }
            }
          ],
          "primaryKeyInfo": {
            "isCustomPrimaryKey": false,
            "primaryKeyFieldName": "id",
            "sortKeyFieldNames": []
          }
        },
        "Scenario": {
          "name": "Scenario",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "scenario": {
              "name": "scenario",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "i18n": {
              "name": "i18n",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "questionId": {
              "name": "questionId",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "question": {
              "name": "question",
              "isArray": false,
              "type": {
                "model": "Question"
              },
              "isRequired": false,
              "attributes": [],
              "association": {
                "connectionType": "BELONGS_TO",
                "targetNames": [
                  "questionId"
                ]
              }
            },
            "order": {
              "name": "order",
              "isArray": false,
              "type": "Int",
              "isRequired": false,
              "attributes": []
            },
            "createdAt": {
              "name": "createdAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            },
            "updatedAt": {
              "name": "updatedAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            }
          },
          "syncable": true,
          "pluralName": "Scenarios",
          "attributes": [
            {
              "type": "model",
              "properties": {}
            },
            {
              "type": "key",
              "properties": {
                "fields": [
                  "id"
                ]
              }
            },
            {
              "type": "key",
              "properties": {
                "name": "scenariosByI18nAndOrder",
                "queryField": "listScenarioByLang",
                "fields": [
                  "i18n",
                  "order"
                ]
              }
            },
            {
              "type": "key",
              "properties": {
                "name": "scenariosByQuestionId",
                "queryField": "listScenarioByQuestion",
                "fields": [
                  "questionId"
                ]
              }
            },
            {
              "type": "auth",
              "properties": {
                "rules": [
                  {
                    "allow": "private",
                    "operations": [
                      "read"
                    ]
                  },
                  {
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "groups": [
                      "admin",
                      "assessment_admin"
                    ],
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  },
                  {
                    "allow": "public",
                    "provider": "apiKey",
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  }
                ]
              }
            }
          ],
          "primaryKeyInfo": {
            "isCustomPrimaryKey": false,
            "primaryKeyFieldName": "id",
            "sortKeyFieldNames": []
          }
        },
        "Question": {
          "name": "Question",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "scenario": {
              "name": "scenario",
              "isArray": false,
              "type": {
                "model": "Scenario"
              },
              "isRequired": false,
              "attributes": [],
              "association": {
                "connectionType": "HAS_ONE",
                "associatedWith": [
                  "questionId"
                ],
                "targetNames": []
              }
            },
            "response": {
              "name": "response",
              "isArray": true,
              "type": {
                "model": "Response"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true,
              "association": {
                "connectionType": "HAS_MANY",
                "associatedWith": [
                  "questionId"
                ]
              }
            },
            "topicId": {
              "name": "topicId",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "topic": {
              "name": "topic",
              "isArray": false,
              "type": {
                "model": "Topic"
              },
              "isRequired": false,
              "attributes": [],
              "association": {
                "connectionType": "BELONGS_TO",
                "targetNames": [
                  "topicId"
                ]
              }
            },
            "createdAt": {
              "name": "createdAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            },
            "updatedAt": {
              "name": "updatedAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            }
          },
          "syncable": true,
          "pluralName": "Questions",
          "attributes": [
            {
              "type": "model",
              "properties": {}
            },
            {
              "type": "key",
              "properties": {
                "name": "questionsByTopicId",
                "queryField": "listQuestionsByTopic",
                "fields": [
                  "topicId"
                ]
              }
            },
            {
              "type": "auth",
              "properties": {
                "rules": [
                  {
                    "allow": "private",
                    "operations": [
                      "read"
                    ]
                  },
                  {
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "groups": [
                      "admin",
                      "assessment_admin"
                    ],
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  },
                  {
                    "allow": "public",
                    "provider": "apiKey",
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  }
                ]
              }
            }
          ],
          "primaryKeyInfo": {
            "isCustomPrimaryKey": false,
            "primaryKeyFieldName": "id",
            "sortKeyFieldNames": []
          }
        },
        "Topic": {
          "name": "Topic",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "title": {
              "name": "title",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "questions": {
              "name": "questions",
              "isArray": true,
              "type": {
                "model": "Question"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true,
              "association": {
                "connectionType": "HAS_MANY",
                "associatedWith": [
                  "topicId"
                ]
              }
            },
            "i18n": {
              "name": "i18n",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "order": {
              "name": "order",
              "isArray": false,
              "type": "Int",
              "isRequired": true,
              "attributes": []
            },
            "createdAt": {
              "name": "createdAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            },
            "updatedAt": {
              "name": "updatedAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            }
          },
          "syncable": true,
          "pluralName": "Topics",
          "attributes": [
            {
              "type": "model",
              "properties": {}
            },
            {
              "type": "key",
              "properties": {
                "name": "topicsByI18nAndOrder",
                "queryField": "listTopicsByLang",
                "fields": [
                  "i18n",
                  "order"
                ]
              }
            },
            {
              "type": "auth",
              "properties": {
                "rules": [
                  {
                    "allow": "private",
                    "operations": [
                      "read"
                    ]
                  },
                  {
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "groups": [
                      "admin",
                      "assessment_admin"
                    ],
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  },
                  {
                    "allow": "public",
                    "provider": "apiKey",
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  }
                ]
              }
            }
          ],
          "primaryKeyInfo": {
            "isCustomPrimaryKey": false,
            "primaryKeyFieldName": "id",
            "sortKeyFieldNames": []
          }
        },
        "AssessmentForm": {
          "name": "AssessmentForm",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "topic": {
              "name": "topic",
              "isArray": true,
              "type": {
                "nonModel": "FormTopic"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            },
            "i18n": {
              "name": "i18n",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "isCompleted": {
              "name": "isCompleted",
              "isArray": false,
              "type": "Boolean",
              "isRequired": false,
              "attributes": []
            },
            "assessor": {
              "name": "assessor",
              "isArray": true,
              "type": "String",
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            },
            "assessee": {
              "name": "assessee",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "createdAt": {
              "name": "createdAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            },
            "updatedAt": {
              "name": "updatedAt",
              "isArray": false,
              "type": "AWSDateTime",
              "isRequired": false,
              "attributes": [],
              "isReadOnly": true
            }
          },
          "syncable": true,
          "pluralName": "AssessmentForms",
          "attributes": [
            {
              "type": "model",
              "properties": {}
            },
            {
              "type": "key",
              "properties": {
                "name": "assessmentFormsByI18n",
                "queryField": "listByLang",
                "fields": [
                  "i18n"
                ]
              }
            },
            {
              "type": "auth",
              "properties": {
                "rules": [
                  {
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "operations": [
                      "read"
                    ],
                    "groups": [
                      "customer_service_admin",
                      "admin"
                    ]
                  },
                  {
                    "provider": "userPools",
                    "ownerField": "assessor",
                    "allow": "owner",
                    "operations": [
                      "read"
                    ],
                    "identityClaim": "cognito:username"
                  },
                  {
                    "provider": "userPools",
                    "ownerField": "owner",
                    "allow": "owner",
                    "operations": [
                      "read"
                    ],
                    "identityClaim": "cognito:username"
                  },
                  {
                    "provider": "userPools",
                    "ownerField": "assessee",
                    "allow": "owner",
                    "identityClaim": "cognito:username",
                    "operations": [
                      "create",
                      "update",
                      "delete",
                      "read"
                    ]
                  }
                ]
              }
            }
          ],
          "primaryKeyInfo": {
            "isCustomPrimaryKey": false,
            "primaryKeyFieldName": "id",
            "sortKeyFieldNames": []
          }
        }
      },
      "enums": {},
      "nonModels": {
        "FormResponse": {
          "name": "FormResponse",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "state": {
              "name": "state",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "degree": {
              "name": "degree",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "order": {
              "name": "order",
              "isArray": false,
              "type": "Int",
              "isRequired": false,
              "attributes": []
            }
          }
        },
        "FormScenario": {
          "name": "FormScenario",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "scenario": {
              "name": "scenario",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "order": {
              "name": "order",
              "isArray": false,
              "type": "Int",
              "isRequired": false,
              "attributes": []
            }
          }
        },
        "FormQuestion": {
          "name": "FormQuestion",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "scenario": {
              "name": "scenario",
              "isArray": false,
              "type": {
                "nonModel": "FormScenario"
              },
              "isRequired": false,
              "attributes": []
            },
            "responses": {
              "name": "responses",
              "isArray": true,
              "type": {
                "nonModel": "FormResponse"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            }
          }
        },
        "Part1Answer": {
          "name": "Part1Answer",
          "fields": {
            "scenarioId": {
              "name": "scenarioId",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            },
            "responseId": {
              "name": "responseId",
              "isArray": false,
              "type": "String",
              "isRequired": true,
              "attributes": []
            }
          }
        },
        "Part2Answer": {
          "name": "Part2Answer",
          "fields": {
            "scenarioId": {
              "name": "scenarioId",
              "isArray": true,
              "type": "String",
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            }
          }
        },
        "FormTopic": {
          "name": "FormTopic",
          "fields": {
            "id": {
              "name": "id",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "title": {
              "name": "title",
              "isArray": false,
              "type": "String",
              "isRequired": false,
              "attributes": []
            },
            "order": {
              "name": "order",
              "isArray": false,
              "type": "Int",
              "isRequired": false,
              "attributes": []
            },
            "questions": {
              "name": "questions",
              "isArray": true,
              "type": {
                "nonModel": "FormQuestion"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            },
            "part1": {
              "name": "part1",
              "isArray": true,
              "type": {
                "nonModel": "Part1Answer"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            },
            "part2": {
              "name": "part2",
              "isArray": true,
              "type": {
                "nonModel": "Part2Answer"
              },
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            }
          }
        }
      }
    }
  },
  "version": "1"
}

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
  for (const topic of topicResult) {
    for (let i = 0; i < 10; i++) {
      const question =  (await clientAssessmentTopic.models.Question.create({
        topicId: topic.id
      })).data
      if (question) {
        for (const response of responseResult) {
          await clientAssessmentTopic.models.Response.update({
            id: response.id,
            questionId: question.id
          })
        }
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