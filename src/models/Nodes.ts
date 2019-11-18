export interface NodeUser {
  name: string;
  id: string;
  email: string;
  isFirstTimeLogin: boolean;
  accountType: string;
}

export interface NodeTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface NodeAuth {
  user: NodeUser;
  tokens: NodeTokens;
}

export interface NodeSignUp {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}
