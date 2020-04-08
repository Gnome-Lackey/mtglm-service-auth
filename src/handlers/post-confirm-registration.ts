import { requestAuthMiddleware } from "mtglm-service-sdk/build/middleware/requestAuth";

import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";
import { ConfirmRegistrationBodyRequest } from "mtglm-service-sdk/build/models/Requests";

import AuthController from "../controllers/auth";

const controller = new AuthController();

module.exports.handler = requestAuthMiddleware(
  async (data: ConfirmRegistrationBodyRequest): Promise<LambdaResponse> => {
    const response = await controller.confirmRegistration(data);

    return response;
  }
);
