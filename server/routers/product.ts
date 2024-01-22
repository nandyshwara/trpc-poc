import { router, publicProcedure, privateProcedure } from "../trpc"
import { prisma } from "../dbclient"
import { z } from "zod"
import { isAdmin } from "../utils/adminHelper"
import { TRPCError } from "@trpc/server"
import { params, createProductParams } from "../schema/product.schema"
import { createProductHandler, deleteProductHandler, getAllProductHandler } from "../controllers/product.controller"
const productSelect = {
    id: true,
    product_name: true,
    price: true,
    image_url: true,
    quantity: true,
}


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