export interface LambdaToken {
  sub: string;
}

export interface LambdaHeaders {
  Authorization: string;
}

export interface LambdaEvent {
  headers: LambdaHeaders;
  body?: string;
}

export interface LambdaResponse {
  statusCode: number;
  body: string;
  headers: {
    [key: string]: string | boolean;
  }
}
