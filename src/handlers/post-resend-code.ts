import { requestMiddleware } from "../middleware/request";

import * as authController from "../controllers/auth";

import { LambdaResponse } from "../models/Lambda";
import { RequestResendConfirmationCodeBody } from "../models/Requests";

module.exports.handler = requestMiddleware(
  async (data: RequestResendConfirmationCodeBody): Promise<LambdaResponse> => {
    const response = await authController.resendConfirmationCode(data);

    return response;
  }
);
