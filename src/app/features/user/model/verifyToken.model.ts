export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface VerifyTokenType {
  tokens: {
    [key: string]: Tokens;
  };
}

export interface JWTPayload {
  user_id: string;
  iat: number;
  exp: number;
}
