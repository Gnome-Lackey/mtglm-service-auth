import { requestMiddleware } from "../middleware/request";

import * as authController from "../controllers/auth";

import { LambdaResponse } from "../models/Lambda";
import { RequestConfirmRegistrationBody } from "../models/Requests";

module.exports.handler = requestMiddleware(
  async (data: RequestConfirmRegistrationBody): Promise<LambdaResponse> => {
    const response = await authController.confirmRegistration(data);

    return response;
  }
);
