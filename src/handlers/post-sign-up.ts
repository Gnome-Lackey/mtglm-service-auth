import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";
import { SignUpBodyRequest } from "mtglm-service-sdk/build/models/Requests";

import * as authController from "../controllers/auth";

module.exports.handler = requestAuthMiddleware(
  async (data: SignUpBodyRequest): Promise<LambdaResponse> => {
    const response = await authController.signUp(data);

    return response;
  }
);
