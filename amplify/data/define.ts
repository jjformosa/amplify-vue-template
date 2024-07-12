import { a } from '@aws-amplify/backend'

export const readOnlyField = ['read'],
  readWriteField = ['read', 'create', 'update'],
  ownerField = ['read', 'create', 'update', 'delete']

export const i18nDefaultValue = 'zh-tw'
export const geti18n = (i18nValue?: string | null) => a.string().default(i18nValue ?? i18nDefaultValue)
