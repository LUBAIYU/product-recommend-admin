import request from '@/util/request'

//新增商品
export const addProductAPI = (data: API.ProductInfo) => {
  return request({
    method: 'POST',
    url: '/product/add/info',
    data
  }) as Promise<API.Result>
}

//删除商品
export const delProductByIdAPI = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/product/delete/${id}`
  }) as Promise<API.Result>
}

//修改商品
export const updateProductAPI = (data: API.ProductInfo) => {
  return request({
    method: 'PUT',
    url: '/product/update/info',
    data
  }) as Promise<API.Result>
}

//条件分页查询商品
export const listProductsByPageAPI = (data: API.listProductsParams) => {
  return request({
    method: 'GET',
    url: '/product/page',
    params: data
  }) as Promise<API.Result>
}