import axios from 'axios'
import crypto from 'crypto'
import { decodeJWT } from 'aws-amplify/auth'

export const verifyIdTokenWithLiff = async function (id_token: string, client_info: { email: String }): Promise<boolean> {
  const client_id = process.env.LIFF_ID
  const liffSecrect = process.env.LIFF_SECRECT
  console.log(`liff param: ${client_id}, ${liffSecrect}`)
  if (!client_id || !liffSecrect) return Promise.reject(false)

  const expect_nonce = crypto.randomBytes(16).toString('base64')
  const verifyResponse = await axios.post('https://api.line.me/oauth2/v2.1/verify', {
    id_token,
    client_id,
    expect_nonce
  }, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
  if (verifyResponse.status === 200) {
    const { nonce, email } = verifyResponse.data
    if (nonce === expect_nonce && email === client_info.email) {
      return true
    }
  }
  return false
}

export const verifyAccessTokenWithLiff = async function (access_token: string, client_info: { email: String }): Promise<boolean> {
  const client_id = process.env.LIFF_ID
  const liffSecrect = process.env.LIFF_SECRECT
  console.log(`liff param: ${client_id}, ${liffSecrect}`)
  if (!client_id || !liffSecrect) return Promise.reject(false)

  const expect_nonce = crypto.randomBytes(16).toString('base64')
  const verifyResponse = await axios.get('https://api.line.me/oauth2/v2.1/verify', {
    params: {
      access_token,
      client_id,
      expect_nonce
    }
  })
  if (verifyResponse.status === 200) {
    const { nonce, email } = verifyResponse.data
    if (nonce === expect_nonce && email === client_info.email) {
      return true
    }
  }
  return false
}