import * as authService from "../services/auth";

import { logFailure, logSuccess } from "../utils/logger";
import { handleError, handleSuccess } from "../utils/response";
import {
  RequestLoginBody,
  RequestResendConfirmationCodeBody,
  RequestSignUpBody,
  RequestConfirmRegistrationBody
} from "../models/Requests";
import { LambdaResponse } from "../models/Lambda";

export const login = async (data: RequestLoginBody): Promise<LambdaResponse> => {
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
  data: RequestConfirmRegistrationBody
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

export const resendConfirmationCode = async (
  data: RequestResendConfirmationCodeBody
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

export const signUp = async (data: RequestSignUpBody): Promise<LambdaResponse> => {
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
