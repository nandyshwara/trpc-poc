import { LoginParamsInput, getByIdParamsInput } from "../schema/user.schema";
import {prisma} from "../dbclient"
import jwt from "jsonwebtoken"
import { JWT_SECRET} from "../routers/user"

export const login = async(loginInput : LoginParamsInput) =>{
    const user = await prisma.user.findUnique({
        where: {
            email: loginInput.email,
        }
    })
    const token = jwt.sign({ userId: user?.id }, JWT_SECRET, {
        expiresIn: "24h",
    });
    return { user: user, token: token }
}


export const getUserById = async(loginInput : getByIdParamsInput) =>{
    const user = await prisma.user.findUnique({
        where: {
            id: loginInput.user_id,
        }
    })
  
    return user
}

export const getAllUsers = async()=>{
    return prisma.user.findMany();
}