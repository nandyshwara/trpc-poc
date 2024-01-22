import { router, publicProcedure, privateProcedure } from "../trpc"
import { params, createProductParams } from "../schema/product.schema"
import { createProductHandler, deleteProductHandler, getAllProductHandler } from "../controllers/product.controller"



export const productRouter = router({
    getAll: publicProcedure.query(async() => {
        return await getAllProductHandler();
    }),
    create: privateProcedure.input(
        createProductParams
    )
        .mutation(({ input }) => createProductHandler({ inputData: input })),
    delete: privateProcedure.input(params)
        .mutation(({ input }) => deleteProductHandler({ paramsInput: input }))
})