declare namespace API {
  type UserInfo = {
    id: number,
    userName: string,
    userAvatar: string,
    userPassword: string,
    gender: number,
    age: number,
    phone: string,
    address: string,
    createTime: date,
    updateTime: date
  };

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

  type UpdateUserParams = {
    id: number,
    userName: string,
    userAvatar: string,
    gender: number,
    age: number,
    phone: string,
    address: string
  };
}