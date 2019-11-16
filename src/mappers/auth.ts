import {
  AuthenticationResultType,
  AttributeType,
  GetUserResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { NodeAuth } from "../models/Nodes";
import { RequestSignUpBody } from "../models/Requests";
import { NodeSignUp } from "../models/Nodes";
import { ViewUser, ViewAuth } from "../models/Views";

export const toNodeSignUp = (data: RequestSignUpBody): NodeSignUp => {
  const { email, firstName, lastName, userName, password } = data;

  return { email, firstName, lastName, userName, password };
};

export const toNodeAuth = (
  attributes: AttributeType[],
  tokens: AuthenticationResultType,
  name: string
): NodeAuth => {
  const { TokenType, AccessToken, IdToken, RefreshToken } = tokens;

  const id = attributes.find((attr) => attr.Name === "sub").Value;
  const email = attributes.find((attr) => attr.Name === "email").Value;
  const isFirstTimeLogin = !!parseInt(
    attributes.find((attr) => attr.Name === "custom:first_time_login").Value,
    10
  );

  return {
    user: {
      name,
      id,
      email,
      isFirstTimeLogin
    },
    tokens: {
      accessToken: `${TokenType} ${AccessToken}`,
      refreshToken: RefreshToken,
      idToken: IdToken
    }
  };
};

export const toViewSignUp = (id: string, data: NodeSignUp): ViewUser => ({
  id,
  name: data.userName,
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName
});

export const toViewAuth = (data: NodeAuth): ViewAuth => {
  const headers = {
    "X-ID-Token": data.tokens.idToken,
    "X-Access-Token": data.tokens.accessToken,
    "set-cookie": `refreshToken=${data.tokens.refreshToken}; HttpOnly; Secure; SameSite=None;`
  };

  return {
    body: {
      user: data.user
    },
    headers
  };
};

export const toViewGetUser = (data: GetUserResponse): ViewUser => {
  const { Username, UserAttributes } = data;

  const id = UserAttributes.find((attribute) => attribute.Name === "sub").Value;
  const email = UserAttributes.find((attribute) => attribute.Name === "email").Value;

  return {
    id,
    email,
    name: Username
  };
};
