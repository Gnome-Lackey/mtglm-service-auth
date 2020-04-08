import MTGLMLogger from "mtglm-service-sdk/build/utils/logger";
import ResponseHandler from "mtglm-service-sdk/build/utils/response";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";
import {
  LoginBodyRequest,
  ResendConfirmationCodeBodyRequest,
  SignUpBodyRequest,
  ConfirmRegistrationBodyRequest
} from "mtglm-service-sdk/build/models/Requests";

import AuthService from "../services/auth";

export default class AuthController {
  private service = new AuthService();
  private logger = new MTGLMLogger();
  private responseHandler = new ResponseHandler();

  login = async (data: LoginBodyRequest): Promise<LambdaResponse> => {
    try {
      const result = await this.service.login(data);

      this.logger.success("cognito", "POST login", result);

      return this.responseHandler.success(result.body, result.headers);
    } catch (error) {
      this.logger.failure("cognito", "POST login", error);

      return this.responseHandler.error(error, "LOGIN");
    }
  };

  logout = async (authorization: string): Promise<LambdaResponse> => {
    try {
      const result = await this.service.logout(authorization);

      this.logger.success("cognito", "POST logout", result);

      return this.responseHandler.success({ message: "Success" });
    } catch (error) {
      this.logger.failure("cognito", "POST logout", error);

      return this.responseHandler.error(error, "LOGOUT");
    }
  };

  confirmRegistration = async (data: ConfirmRegistrationBodyRequest): Promise<LambdaResponse> => {
    try {
      const result = await this.service.confirmRegistration(data);

      this.logger.success("cognito", "POST confirm registration", result);

      return this.responseHandler.success({ message: "Success" });
    } catch (error) {
      this.logger.failure("cognito", "POST confirm registration", error);

      return this.responseHandler.error(error, "CONFIRM_REGISTRATION");
    }
  };

  initAdmin = async (): Promise<LambdaResponse> => {
    try {
      const result = await this.service.initAdmin();

      this.logger.success("cognito", "POST init admin account", result);

      return this.responseHandler.success(result);
    } catch (error) {
      this.logger.failure("cognito", "POST init admin account", error);

      return this.responseHandler.error(error, "INIT_ADMIN_ACCOUNT");
    }
  };

  resendConfirmationCode = async (
    data: ResendConfirmationCodeBodyRequest
  ): Promise<LambdaResponse> => {
    try {
      const result = await this.service.resendConfirmationCode(data);

      this.logger.success("cognito", "POST resend confirmation code", result);

      return this.responseHandler.success({ message: "Success" });
    } catch (error) {
      this.logger.failure("cognito", "POST resend confirmation code", error);

      return this.responseHandler.error(error, "RESEND_CONFIRMATION_CODE");
    }
  };

  signUp = async (data: SignUpBodyRequest): Promise<LambdaResponse> => {
    try {
      const result = await this.service.signUp(data);

      this.logger.success("cognito", "POST Sign Up", result);

      return this.responseHandler.success(result);
    } catch (error) {
      this.logger.failure("cognito", "POST Sign Up", error);

      return this.responseHandler.error(error, "SIGN_UP");
    }
  };

  validate = async (authorization: string): Promise<LambdaResponse> => {
    try {
      const result = await this.service.validate(authorization);

      this.logger.success("cognito", "POST validate", result);

      return this.responseHandler.success(result);
    } catch (error) {
      this.logger.failure("cognito", "POST validate", error);

      return this.responseHandler.error(error, "VALIDATE");
    }
  };
}
