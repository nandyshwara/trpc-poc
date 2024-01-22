import { object, string, number, TypeOf } from 'zod';


export const params = object({
    orderId: string(),
});

export const createOrderParams = object({
    user_id: string(),
    product_id: string(),
    quantity: number()
})

export type ParamsInput = TypeOf<typeof params>;
export type createOrderParams = TypeOf<typeof createOrderParams>;