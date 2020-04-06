import CognitoClient from "mtglm-service-sdk/build/clients/cognito";

import AuthMapper from "mtglm-service-sdk/build/mappers/auth";

import { parseToken } from "mtglm-service-sdk/build/utils/token";

import {
  AuthResponse,
  LoginResponse,
  SuccessResponse
} from "mtglm-service-sdk/build/models/Responses";

import {
  LoginBodyRequest,
  ConfirmRegistrationBodyRequest,
  ResendConfirmationCodeBodyRequest,
  SignUpBodyRequest
} from "mtglm-service-sdk/build/models/Requests";

export default class AuthService {
  private client = new CognitoClient();

  private mapper = new AuthMapper();

  async login(data: LoginBodyRequest): Promise<LoginResponse> {
    const { userName, password } = data;

    const tokens = await this.client.login(userName, password);

    const { AccessToken } = tokens;

    const user = await this.client.getLoggedInUser(AccessToken);

    const authNode = this.mapper.toNodeAuth(user);
    const tokensNode = this.mapper.toNodeTokens(tokens);

    return {
      body: this.mapper.toResponseLogin(authNode),
      headers: this.mapper.toResponseLoginHeaders(tokensNode)
    };
  }

  async logout(authorization: string): Promise<SuccessResponse> {
    const token = parseToken(authorization);

    return await this.client.logout(token);
  }

  async confirmRegistration(data: ConfirmRegistrationBodyRequest): Promise<SuccessResponse> {
    const { userName, verificationCode } = data;

    return await this.client.confirmRegistration(verificationCode, userName);
  }

  async resendConfirmationCode(data: ResendConfirmationCodeBodyRequest): Promise<SuccessResponse> {
    const { userName } = data;

    return await this.client.resendConfirmationCode(userName);
  }

  async initAdmin(): Promise<AuthResponse> {
    const result = await this.client.initAdminAccount();

    if (result) {
      return this.mapper.toResponseInitAdmin(result);
    }

    return { user: null };
  }

  async signUp(data: SignUpBodyRequest): Promise<AuthResponse> {
    const node = this.mapper.toNodeSignUp(data);

    const uid = await this.client.signUp(node);

    return this.mapper.toResponseSignUp(uid, node);
  }

  async validate(authorization: string): Promise<AuthResponse> {
    const token = parseToken(authorization);

    const result = await this.client.validate(token);

    return this.mapper.toResponseValidate(result);
  }
}
