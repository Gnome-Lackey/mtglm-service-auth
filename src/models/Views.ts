export interface ViewUser {
  name: string;
  id: string;
  email: string;
  isFirstTimeLogin?: boolean;
  firstName?: string;
  lastName?: string;
}

export interface ViewAuth {
  body: {
    user: ViewUser;
  };
  headers: {
    "X-ID-Token": string;
    "X-Access-Token": string;
    "set-cookie": string;
  };
}
