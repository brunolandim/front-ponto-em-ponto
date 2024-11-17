export namespace CreateCompanyWithAdminAPI {
  export interface Request {
    companyData: {
      name: string;
    };
    adminData: {
      name: string;
      email: string;
      role: 'admin';
    };
  }

  export interface Response {
    success: boolean;
    message: string;
    data: {
      companyId: string;
      adminId: string;
    };
  }
}
