import { requestMiddleware } from "../middleware/request";

import * as authController from "../controllers/auth";

import { LambdaResponse } from "../models/Lambda";
import { RequestSignUpBody } from "../models/Requests";

module.exports.handler = requestMiddleware(
  async (data: RequestSignUpBody): Promise<LambdaResponse> => {
    const response = await authController.signUp(data);

    return response;
  }
);
