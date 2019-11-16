import { LambdaResponse } from "../models/Lambda";
import { ResponseUserView, ResponseError, ResponseSuccess } from "../models/Responses";

import { DEFAULT_HEADERS } from "../constants/headers";
import {
  ERROR_NAMES,
  ERROR_MESSAGES,
  ERROR_CODES,
  ERROR_DISPLAY_CODES,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_DISPLAY_CODES
} from "../constants/errors";

type ErrorDomains =
  | "LOGIN"
  | "CONFIRM_REGISTRATION"
  | "SIGN_UP"
  | "VALIDATE"
  | "LOGOUT"
  | "RESEND_CONFIRMATION_CODE";

export const handleError = (error: ResponseError, domain: ErrorDomains): LambdaResponse => {
  console.log("[ERROR] Original Error:", error);

  const name = ERROR_NAMES[error.code];
  const code = ERROR_CODES[name] || DEFAULT_ERROR_CODE;
  const displayCode = ERROR_DISPLAY_CODES[name] || DEFAULT_ERROR_DISPLAY_CODES;
  const message = ERROR_MESSAGES[domain] ? ERROR_MESSAGES[domain][name] : DEFAULT_ERROR_MESSAGE;

  console.log("[ERROR] Response:", code, displayCode, message);

  return {
    statusCode: code,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      status: code,
      data: {
        error: {
          name: displayCode,
          message
        }
      }
    })
  };
};

export function handleSuccess(body: ResponseUserView, headers?: object): LambdaResponse;
export function handleSuccess(body: ResponseSuccess, headers?: object): LambdaResponse;
export function handleSuccess(body: object, headers?: object): LambdaResponse {
  const statusCode = 200;
  const parsedBody = body || {};

  console.log("[SUCCESS] Response:", statusCode, parsedBody);

  return {
    statusCode,
    headers: { ...DEFAULT_HEADERS, ...headers },
    body: JSON.stringify({
      status: statusCode,
      data: parsedBody
    })
  };
}
