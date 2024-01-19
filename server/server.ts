import {createExpressMiddleware} from "@trpc/server/adapters/express"
import express from "express"
import { appRouter } from './routers';
import cors from "cors"
import { createContext } from "./contest";
const app = express();


app.use(cors())
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext 
  })
);

app.listen(3000,()=>{
    console.log("server is running at port 3000")
});

export type AppRouter = typeof appRouter;
