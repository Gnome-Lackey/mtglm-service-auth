import { requestMiddleware } from "../middleware/request";

import * as authController from "../controllers/auth";

import { LambdaResponse } from "../models/Lambda";

module.exports.handler = requestMiddleware(
  async (token: string): Promise<LambdaResponse> => {
    const response = await authController.logout(token);

    return response;
  }
);
