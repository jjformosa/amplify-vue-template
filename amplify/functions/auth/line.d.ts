import { 
  type SignInInput,
  type SignUpInput
} from "aws-amplify/auth"

export type IdentitySource = 'email' | 'liff' | 'lineLogin' | 'google' | 'facebook'

export type PayloadWithLiff = {
  email: string,
  name: string,
  picture: string,
  sub: string,
  iss: string,
  aud: string
}

export type SignUpInputWithLiff = {
  clientId: string,
  email: string,
  name: string,
  picture: string,
  accesstoken: string,
  idToken: string
}

export declare function verifyAccessTokenWithLiff(access_token: string, client_info: { email: string }): Promise<boolean>
export declare function verifyIdTokenWithLiff(id_token: string, client_info: { email: string }): Promise<boolean>