export const DEFAULT_HEADERS: {
  "Content-Type": string;
  "Access-Control-Allow-Origin": string;
  "Access-Control-Expose-Headers": string;
  "Access-Control-Allow-Credentials": boolean;
} = {
  "Content-Type": "application/json",
  "Access-Control-Expose-Headers": "Authorization, x-access-token, x-id-token",
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN,
  "Access-Control-Allow-Credentials": true
};
