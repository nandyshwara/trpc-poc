import {router } from "../trpc"
import { userRouter } from './user';
import { productRouter } from "./product"
import { orderRouter } from "./order"

export const appRouter = router({
    user : userRouter,
    products : productRouter,
    order : orderRouter,
})
