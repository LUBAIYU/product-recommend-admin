declare namespace API {
  type Result = {
    code: number,
    data: any,
    message: string
  };

  type LoginParams = {
    userName: string,
    userPassword: string
  };

  type RegisterParams = {
    userName: string,
    userPassword: string,
    confirmPassword: string
  };
}