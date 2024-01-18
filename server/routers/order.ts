import { prisma } from "../dbclient"
import { privateProcedure, publicProcedure, router } from "../trpc"
import { z } from "zod"


const orderProcedure = privateProcedure.input(z.object({ order_id: z.string() }))
export const orderRouter = router({
    create: privateProcedure.input(z.object({
        user_id: z.string(),
        product_id: z.string(),
        quantity: z.number().gt(0),
    })).mutation(async ({ input }) => {
        return await prisma.order.create({
            data: input,
        })
    }),

    getAll: publicProcedure.query(async () => {
        return await prisma.order.findMany({
            include: {
                user: true,
                product: true
            }
        })
    }),

    getById: orderProcedure.query(async ({ input }) => {
        console.log(orderProcedure)
        const data = await prisma.order.findUnique({
            where: {
                id: input.order_id
            },
            include: {
                user: true,
                product: true
            }
        })

        return data

    })
})