import { privateProcedure, publicProcedure, router } from "../trpc"
import {createOrderParams, params, } from "../schema/order.schema"
import { createOrderController, getAllOrderHandler, getOrderByIdHandler} from "../controllers/order.controller"


export const orderRouter = router({
    create: privateProcedure.input(createOrderParams).mutation(({ input }) => createOrderController({ inputData: input })),
    getAll: publicProcedure.query(()=> {return getAllOrderHandler()}),

    getById: publicProcedure.input(params).mutation(({ input }) => {
        return getOrderByIdHandler({paramsInput : input})
    })
})