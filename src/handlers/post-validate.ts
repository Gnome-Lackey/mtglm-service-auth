import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import * as authController from "../controllers/auth";

module.exports.handler = requestAuthMiddleware(
  async (token: string): Promise<LambdaResponse> => {
    const response = await authController.validate(token);

    return response;
  }
);
