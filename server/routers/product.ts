import { router , publicProcedure, privateProcedure } from "../trpc"
import { prisma } from "../dbclient"
import { z } from "zod"
import { isAdmin } from "../utils/adminHelper"
import {TRPCError} from "@trpc/server"


const productSelect = {
    id: true,
    product_name: true,
    price: true,
    image_url: true,
    quantity: true,
}


export const productRouter = router({
    getAll: publicProcedure.query(async () => {
        return await prisma.product.findMany({ select: productSelect });
    }),
    create: privateProcedure.input(z.object({
        product_name: z.string(),
        price : z.number().gt(0),
        image_url : z.string().default(""),
        quantity : z.number().gt(0)
    }))
    .mutation(async({ctx,input})=>{
        const isAdminTrue = await isAdmin(ctx.req.headers.authorization?.split(' ')[1])
        if(isAdminTrue){
            return await prisma.product.create({
                data : input,
                select: productSelect,
            })
        }
        else {
            throw new TRPCError({
                code : "UNAUTHORIZED"
            })
        }
        
         
    })
})