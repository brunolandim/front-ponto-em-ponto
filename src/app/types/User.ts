export namespace GetUserById {
  export interface Request {
    email: string;
  }

  export interface Response {
    success: boolean;
    message: string;
    data: {
      company: {
        id: string;
        name: string;
      }
      _id: string;
      name: string;
      email: string;
      role: string;
    }
  }
}
