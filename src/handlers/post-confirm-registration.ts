import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import * as authController from "../controllers/auth";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";
import { ConfirmRegistrationBodyRequest } from "mtglm-service-sdk/build/models/Requests";

module.exports.handler = requestAuthMiddleware(
  async (data: ConfirmRegistrationBodyRequest): Promise<LambdaResponse> => {
    const response = await authController.confirmRegistration(data);

    return response;
  }
);
