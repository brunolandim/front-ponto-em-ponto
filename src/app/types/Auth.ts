export namespace RequestConfirmationCode {
  export interface Request {
    email: string;
  }

  export interface Response {
    success: boolean;
    message: string;
    data: null
  }
}

export namespace RequestConfirmationCode {
  export interface Request {
    email: string;
  }

  export interface Response {
    success: boolean;
    message: string;
  }
}

export namespace ConfirmationCodeAuthorization {
  export interface Request {
    email: string;
    shortCode: string;
  }

  export interface Response {
    success: boolean;
    message: string;
    data: {
      user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        company: {
          id: string,
          name: string,
        },
      };
      token: string;
    };
  }
}


