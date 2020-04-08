import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import AuthController from "../controllers/auth";

const controller = new AuthController();

module.exports.handler = requestAuthMiddleware(
  async (token: string): Promise<LambdaResponse> => {
    const response = await controller.validate(token);

    return response;
  }
);
