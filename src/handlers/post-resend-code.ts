import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { ResendConfirmationCodeBodyRequest } from "mtglm-service-sdk/build/models/Requests";
import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import * as authController from "../controllers/auth";

module.exports.handler = requestAuthMiddleware(
  async (data: ResendConfirmationCodeBodyRequest): Promise<LambdaResponse> => {
    const response = await authController.resendConfirmationCode(data);

    return response;
  }
);
