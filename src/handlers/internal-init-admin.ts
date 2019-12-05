import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import * as authController from "../controllers/auth";

module.exports.handler = async (): Promise<LambdaResponse> => {
  const response = await authController.initAdmin();

  return response;
};
