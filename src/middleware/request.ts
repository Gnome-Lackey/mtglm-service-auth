import { LambdaResponse, LambdaEvent } from "../models/Lambda";
import {
  RequestLoginBody,
  RequestConfirmRegistrationBody,
  RequestResendConfirmationCodeBody,
  RequestSignUpBody
} from "../models/Requests";

type RequestBodyType =
  | RequestLoginBody
  | RequestConfirmRegistrationBody
  | RequestResendConfirmationCodeBody
  | RequestSignUpBody;

type RequestMiddlewareCallbackBodyType = (data: RequestBodyType) => Promise<LambdaResponse>;
type RequestMiddlewareCallbackTokenType = (token: string) => Promise<LambdaResponse>;
type GetUserIdMiddlewareType = (event: LambdaEvent) => Promise<LambdaResponse>;

const parseData = (body: string): RequestBodyType => {
  if (!body) {
    return null;
  }

  return JSON.parse(body);
};

export function requestMiddleware(callback: RequestMiddlewareCallbackBodyType): GetUserIdMiddlewareType;
export function requestMiddleware(callback: RequestMiddlewareCallbackTokenType): GetUserIdMiddlewareType;
export function requestMiddleware(callback: Function): GetUserIdMiddlewareType {
  return async (event: LambdaEvent): Promise<LambdaResponse> => {
    const { headers, body } = event;

    const { Authorization } = headers;
    const data = parseData(body);

    return await callback(Authorization || data);
  };
}
