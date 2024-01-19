import { initTRPC, inferAsyncReturnType , TRPCError } from '@trpc/server';
import { createContext } from './contest';
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();


const isAuthed = t.middleware(({next,ctx}) => {
   if(!ctx.req.headers.authorization){
    throw new TRPCError ({
        code : "UNAUTHORIZED",
    })
   }
   return next({
    ctx : {
        req : ctx.req,
    }
   })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
export {t}