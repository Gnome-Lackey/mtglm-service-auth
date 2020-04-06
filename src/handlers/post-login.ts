import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LoginBodyRequest } from "mtglm-service-sdk/build/models/Requests";
import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import AuthController from "../controllers/auth";

const controller = new AuthController();

module.exports.handler = requestAuthMiddleware(
  async (data: LoginBodyRequest): Promise<LambdaResponse> => {
    const response = await controller.login(data);

    return response;
  }
);
