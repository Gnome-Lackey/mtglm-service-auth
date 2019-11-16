import { requestMiddleware } from "../middleware/request";

import * as authController from "../controllers/auth";

import { LambdaResponse } from "../models/Lambda";
import { RequestLoginBody } from "../models/Requests";

module.exports.handler = requestMiddleware(
  async (data: RequestLoginBody): Promise<LambdaResponse> => {
    const response = await authController.login(data);

    return response;
  }
);
