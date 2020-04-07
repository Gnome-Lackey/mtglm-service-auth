import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";
import { SignUpBodyRequest } from "mtglm-service-sdk/build/models/Requests";

import AuthController from "../controllers/auth";

const controller = new AuthController();

module.exports.handler = requestAuthMiddleware(
  async (data: SignUpBodyRequest): Promise<LambdaResponse> => {
    const response = await controller.signUp(data);

    return response;
  }
);
