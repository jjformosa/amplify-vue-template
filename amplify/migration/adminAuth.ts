import { signIn, signOut, confirmSignIn } from "aws-amplify/auth"
import { Amplify } from 'aws-amplify'

const outputs = {
  "auth": {
    "user_pool_id": "us-east-1_8M1Vj0JHf",
    "aws_region": "us-east-1",
    "user_pool_client_id": "3csf3agfiqt76g1oa6gi1663m9",
    "identity_pool_id": "us-east-1:35e7edb4-7bae-4c9e-a3eb-4a094021b954",
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
      "domain": "425bbe929ea98db95109.auth.us-east-1.amazoncognito.com"
    },
    "unauthenticated_identities_enabled": true
  },
  "data": {
    "url": "https://fnzmvkesjfegzpz43koij6c6ta.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_region": "us-east-1",
    "default_authorization_type": "AMAZON_COGNITO_USER_POOLS",
    "authorization_types": [
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
              "type": "ID",
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
                "name": "responsesByI18n",
                "queryField": "listResponseByLang",
                "fields": [
                  "i18n"
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
              "type": "ID",
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
                "name": "scenariosByI18n",
                "queryField": "listScenarioByLang",
                "fields": [
                  "i18n"
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
            "responses": {
              "name": "responses",
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
                "name": "topicsByI18n",
                "queryField": "listTopicsByLang",
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
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "operations": [
                      "read"
                    ],
                    "groupsField": "assessor",
                    "groupField": "groups"
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
                    "groupClaim": "cognito:groups",
                    "provider": "userPools",
                    "allow": "groups",
                    "groupsField": "assessee",
                    "groupField": "groups",
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
            "questionId": {
              "name": "questionId",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "responseId": {
              "name": "responseId",
              "isArray": true,
              "type": "ID",
              "isRequired": false,
              "attributes": [],
              "isArrayNullable": true
            }
          }
        },
        "Part2Answer": {
          "name": "Part2Answer",
          "fields": {
            "questionId": {
              "name": "questionId",
              "isArray": false,
              "type": "ID",
              "isRequired": true,
              "attributes": []
            },
            "scenarioId": {
              "name": "scenarioId",
              "isArray": false,
              "type": "AWSJSON",
              "isRequired": false,
              "attributes": []
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

const doSignIn = async () => {
  const { isSignedIn, nextStep } = await signIn({
    username: 'jjformosa1220+1@gmail.com',
    password: '@7aa5f5bdDE3345e2/'
  })
  console.log(`signInStep: ${nextStep.signInStep}`)
  if (!isSignedIn) {
    switch(nextStep.signInStep) {
      case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
        const confirmSignInResult = await confirmSignIn({
          challengeResponse: '@7aa5f5bdDE3345e2/'
        })
        console.log(confirmSignInResult.nextStep)
        break
      default:
        break
    }
  }
  // if (!isSignedIn) {
  //   switch(nextStep.signInStep) {
  //     case 'RESET_PASSWORD':
  //       await resetPassword({
  //         username: 'jjformosa1220+1@gmail.com',
  //         options: {
  //           ''
  //         }
  //       })
  //       break
  //     default:
  //       break
  //   }
  // } 
}

export default doSignIn