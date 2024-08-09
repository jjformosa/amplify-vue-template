import { util } from '@aws-appsync/utils';

// consider that schema of response is a.model({
//     state: a.string().required(),
//     degree: a.string().required(),
//     i18n: define.geti18n().required(),
//     questions: a.string().array(),
//     order: a.integer().default(0)
//   })
// I want to use questionId which is string, search for which questions of response contains ctx.args.questionId.
export function request(ctx) {
  const filter = JSON.parse(
      util.transform.toDynamoDBFilterExpression({
          and: [
              { questions: { contains: ctx.args.questionId }},
              { i18n: { eq: ctx.args.i18n }}
          ]
      }),
  )
  return { operation: 'Scan', filter }
}
// export function response with Response data
export function response(ctx) {
  const { items } = ctx.result
  console.log(items)
  return items
} 
