import { logFailure, logSuccess } from "mtglm-service-sdk/build/utils/logger";
import { handleError, handleSuccess } from "mtglm-service-sdk/build/utils/response";

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

  login = async (data: LoginBodyRequest): Promise<LambdaResponse> => {
    try {
      const result = await this.service.login(data);

      logSuccess("cognito", "POST login", result);

      return handleSuccess(result.body, result.headers);
    } catch (error) {
      logFailure("cognito", "POST login", error);

      return handleError(error, "LOGIN");
    }
  };

  logout = async (authorization: string): Promise<LambdaResponse> => {
    try {
      const result = await this.service.logout(authorization);

      logSuccess("cognito", "POST logout", result);

      return handleSuccess({ message: "Success" });
    } catch (error) {
      logFailure("cognito", "POST logout", error);

      return handleError(error, "LOGOUT");
    }
  };

  confirmRegistration = async (data: ConfirmRegistrationBodyRequest): Promise<LambdaResponse> => {
    try {
      const result = await this.service.confirmRegistration(data);

      logSuccess("cognito", "POST confirm registration", result);

      return handleSuccess({ message: "Success" });
    } catch (error) {
      logFailure("cognito", "POST confirm registration", error);

      return handleError(error, "CONFIRM_REGISTRATION");
    }
  };

  initAdmin = async (): Promise<LambdaResponse> => {
    try {
      const result = await this.service.initAdmin();

      logSuccess("cognito", "POST init admin account", result);

      return handleSuccess(result);
    } catch (error) {
      logFailure("cognito", "POST init admin account", error);

      return handleError(error, "INIT_ADMIN_ACCOUNT");
    }
  };

  resendConfirmationCode = async (
    data: ResendConfirmationCodeBodyRequest
  ): Promise<LambdaResponse> => {
    try {
      const result = await this.service.resendConfirmationCode(data);

      logSuccess("cognito", "POST resend confirmation code", result);

      return handleSuccess({ message: "Success" });
    } catch (error) {
      logFailure("cognito", "POST resend confirmation code", error);

      return handleError(error, "RESEND_CONFIRMATION_CODE");
    }
  };

  signUp = async (data: SignUpBodyRequest): Promise<LambdaResponse> => {
    try {
      const result = await this.service.signUp(data);

      logSuccess("cognito", "POST Sign Up", result);

      return handleSuccess(result);
    } catch (error) {
      logFailure("cognito", "POST Sign Up", error);

      return handleError(error, "SIGN_UP");
    }
  };

  validate = async (authorization: string): Promise<LambdaResponse> => {
    try {
      const result = await this.service.validate(authorization);

      logSuccess("cognito", "POST validate", result);

      return handleSuccess(result);
    } catch (error) {
      logFailure("cognito", "POST validate", error);

      return handleError(error, "VALIDATE");
    }
  };
}
