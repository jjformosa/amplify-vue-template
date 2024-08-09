import { util } from '@aws-appsync/utils'

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
