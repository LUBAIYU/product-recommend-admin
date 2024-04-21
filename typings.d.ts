declare namespace API {
  type UserInfo = {
    id: number | string,
    userName: string,
    userAvatar: string,
    userPassword: string,
    gender: number | string,
    age: number | string,
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

  type listUsersParams = {
    current: number,
    pageSize: number,
    id?: number | string,
    userName?: string,
    gender?: number | string
  };

  type ProductInfo = {
    id: number | string,
    name: string,
    image: string,
    description: string,
    price: number | string,
    stock: number | string,
    status: number | string,
    createTime: date,
    updateTime: date
  }

  type listProductsParams = {
    current: number,
    pageSize: number,
    id?: number | string,
    name?: string,
    status?: number | string
  };
}