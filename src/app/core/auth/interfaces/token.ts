export interface Token {
  access_token: string;
  expires_in: number;
  membership_id: string;
  token_type: string;

  creation?: number;
  expiration?: number;
}
