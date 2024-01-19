import { object, string, TypeOf } from 'zod';


export const params = object({
  productId: string(),
});


export type ParamsInput = TypeOf<typeof params>;
