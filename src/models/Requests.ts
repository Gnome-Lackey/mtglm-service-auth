export interface RequestLoginBody {
  userName: string;
  password: string;
}

export interface RequestConfirmRegistrationBody {
  userName: string;
  verificationCode: string;
}

export interface RequestResendConfirmationCodeBody {
  userName: string;
}

export interface RequestSignUpBody {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}
