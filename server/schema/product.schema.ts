import { object, string,number, TypeOf } from 'zod';


export const params = object({
  productId: string(),
});

export const createProductParams = object({
  product_name: string(),
  price: number(),
  image_url: string(),
  quantity: number()
})


export type ParamsInput = TypeOf<typeof params>;
export type createProductParamsInput = TypeOf<typeof createProductParams>;
