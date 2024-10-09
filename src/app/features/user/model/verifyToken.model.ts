export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface VerifyTokenType {
  tokens: {
    [key: string]: Tokens;
  };
}
