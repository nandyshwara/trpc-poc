import { router ,publicProcedure} from "../trpc";
import { z } from "zod"
import { prisma } from "../dbclient";
import jwt from "jsonwebtoken"
import {getByIdParams, loginParams} from "../schema/user.schema"
import {getAllUsersHandler, getUserByIdHandler, loginHandler} from "../controllers/user.controller"

const selectUserDetails = {
    id: true,
    name: true,
    email: true,
    orders: true
}

export const JWT_SECRET = "dummysecret"

export const userRouter = router({
    signup: publicProcedure.input(z.object({
        name: z.string().min(5),
        email: z.string().email(),
        password: z.string(),
        role: z.enum(["ADMIN", "USER"]).default("USER"),
    }),
    )
        .mutation(async ({ ctx , input }) => {
            console.log("request" , ctx.req)
            const users = await prisma.user.create({
                data: input,
                select: selectUserDetails,
            })
            const token = jwt.sign({
                userId: users.id,
            }, JWT_SECRET, { expiresIn: '24h' });
            return {
                users: users,
                token: token
            }
        }),
    login: publicProcedure.input(loginParams).mutation(async ({input}) => {
       return loginHandler({inputData : input})

    }),
    getAll: publicProcedure.query(() => {
        return getAllUsersHandler();
    }),

    getById: publicProcedure.input(getByIdParams).mutation(async ({input}) => {
        return getUserByIdHandler({inputData : input})
     }),

})
