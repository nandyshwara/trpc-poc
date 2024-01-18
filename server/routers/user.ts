import { router ,publicProcedure} from "../trpc";
import { z } from "zod"
import { prisma } from "../dbclient";
import jwt from "jsonwebtoken"
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
        role: z.enum(["ADMIN", "USER"]).default("ADMIN"),
    }),
    )
        .mutation(async ({ ctx , input }) => {
            console.log("request" , ctx.req)
            // console.log(ctx.res)
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
    login: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string(),
    })).mutation(async ({ input }) => {
        const user = await prisma.user.findUnique({
            where: {
                email: input.email,
            }
        })
        // if (!user) {
        //     throw TRPCError
        // }
        const token = jwt.sign({ userId: user?.id }, JWT_SECRET, {
            expiresIn: "24h",
        });
        return { user: user, token: token }

    }),
    getAll: publicProcedure.query(() => {
        return prisma.user.findMany({ select: selectUserDetails });
    }),

    getById: publicProcedure.input(z.object({ user_id: z.string() })).query(async ({  input }) => {
        return await prisma.user.findUnique({
            where: {
                id: input.user_id
            }
        })
    })

})
