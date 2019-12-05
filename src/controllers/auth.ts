import { logFailure, logSuccess } from "mtglm-service-sdk/build/utils/logger";
import { handleError, handleSuccess } from "mtglm-service-sdk/build/utils/response";
import {
  LoginBodyRequest,
  ResendConfirmationCodeBodyRequest,
  SignUpBodyRequest,
  ConfirmRegistrationBodyRequest
} from "mtglm-service-sdk/build/models/Requests";
import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import * as authService from "../services/auth";

export const login = async (data: LoginBodyRequest): Promise<LambdaResponse> => {
  try {
    const result = await authService.login(data);

    logSuccess("cognito", "POST login", result);

    return handleSuccess(result.body, result.headers);
  } catch (error) {
    logFailure("cognito", "POST login", error);

    return handleError(error, "LOGIN");
  }
};

export const logout = async (authorization: string): Promise<LambdaResponse> => {
  try {
    const result = await authService.logout(authorization);

    logSuccess("cognito", "POST logout", result);

    return handleSuccess({ message: "Success" });
  } catch (error) {
    logFailure("cognito", "POST logout", error);

    return handleError(error, "LOGOUT");
  }
};

export const confirmRegistration = async (
  data: ConfirmRegistrationBodyRequest
): Promise<LambdaResponse> => {
  try {
    const result = await authService.confirmRegistration(data);

    logSuccess("cognito", "POST confirm registration", result);

    return handleSuccess({ message: "Success" });
  } catch (error) {
    logFailure("cognito", "POST confirm registration", error);

    return handleError(error, "CONFIRM_REGISTRATION");
  }
};

export const initAdmin = async (): Promise<LambdaResponse> => {
  try {
    const result = await authService.initAdmin();

    logSuccess("cognito", "POST init admin account", result);

    return handleSuccess(result);
  } catch (error) {
    logFailure("cognito", "POST init admin account", error);

    return handleError(error, "INIT_ADMIN_ACCOUNT");
  }
};

export const resendConfirmationCode = async (
  data: ResendConfirmationCodeBodyRequest
): Promise<LambdaResponse> => {
  try {
    const result = await authService.resendConfirmationCode(data);

    logSuccess("cognito", "POST resend confirmation code", result);

    return handleSuccess({ message: "Success" });
  } catch (error) {
    logFailure("cognito", "POST resend confirmation code", error);

    return handleError(error, "RESEND_CONFIRMATION_CODE");
  }
};

export const signUp = async (data: SignUpBodyRequest): Promise<LambdaResponse> => {
  try {
    const result = await authService.signUp(data);

    logSuccess("cognito", "POST Sign Up", result);

    return handleSuccess(result);
  } catch (error) {
    logFailure("cognito", "POST Sign Up", error);

    return handleError(error, "SIGN_UP");
  }
};

export const validate = async (authorization: string): Promise<LambdaResponse> => {
  try {
    const result = await authService.validate(authorization);

    logSuccess("cognito", "POST validate", result);

    return handleSuccess(result);
  } catch (error) {
    logFailure("cognito", "POST validate", error);

    return handleError(error, "VALIDATE");
  }
};
