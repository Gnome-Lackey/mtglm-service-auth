import { LambdaResponse } from "mtglm-service-sdk/build/models/Lambda";

import AuthController from "../controllers/auth";

const controller = new AuthController();

module.exports.handler = async (): Promise<LambdaResponse> => {
  const response = await controller.initAdmin();

  return response;
};
