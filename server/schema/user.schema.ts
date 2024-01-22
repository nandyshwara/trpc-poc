import {object , TypeOf , string} from "zod"

export const loginParams = object({
    email : string().email(),
    password : string()
})

export const getByIdParams = object({
    user_id : string()
})

export type LoginParamsInput = TypeOf<typeof loginParams>
export type getByIdParamsInput = TypeOf<typeof getByIdParams>
