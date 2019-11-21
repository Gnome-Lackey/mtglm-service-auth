import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LoginBodyRequest } from "mtglm-service-sdk/build/models/Requests";
import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import * as authController from "../controllers/auth";

module.exports.handler = requestAuthMiddleware(
  async (data: LoginBodyRequest): Promise<LambdaResponse> => {
    const response = await authController.login(data);

    return response;
  }
);
