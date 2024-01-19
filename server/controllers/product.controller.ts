import { ParamsInput } from "../schema/product.schema";
import {  deleteProduct } from "../services/product.services"
import {TRPCError} from "@trpc/server"

export const  deleteProductHandler  = async({
    paramsInput,
  }: {
    paramsInput: ParamsInput;
  }) => {
    const post = await deleteProduct(paramsInput.productId)
    if(!post){
        throw new TRPCError({
           code : "NOT_FOUND"
        })
    }
    return{
        status : "success",
        message : "Deleted Successfully"
    }
}