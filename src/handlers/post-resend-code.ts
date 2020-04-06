import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { ResendConfirmationCodeBodyRequest } from "mtglm-service-sdk/build/models/Requests";
import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import AuthController from "../controllers/auth";

const controller = new AuthController();

module.exports.handler = requestAuthMiddleware(
  async (data: ResendConfirmationCodeBodyRequest): Promise<LambdaResponse> => {
    const response = await controller.resendConfirmationCode(data);

    return response;
  }
);
