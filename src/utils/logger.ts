import { ResponseUserView, ResponseError, ResponseSuccess } from "../models/Responses";
import { ViewAuth } from "../models/Views";

export function logSuccess(resource: string, event: string, data: ResponseSuccess): void;
export function logSuccess(resource: string, event: string, data: ResponseUserView): void;
export function logSuccess(resource: string, event: string, data: ViewAuth): void;
export function logSuccess(resource: string, event: string, data: any): void {
  console.log(`Success: ${resource.toUpperCase()} ${event}`);
  console.log(`\t> ${data ? JSON.stringify(data) : "Passed"}`);
}

export const logFailure = (resource: string, event: string, reason: ResponseError): void => {
  console.log(`Failure: ${resource.toUpperCase()} ${event}`);
  console.log(`\t> ${reason ? JSON.stringify(reason) : "Failed"}`);
};
