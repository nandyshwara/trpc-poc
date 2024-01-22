import { ParamsInput, createProductParamsInput } from "../schema/product.schema";
import { createProduct, deleteProduct, getAllProducts } from "../services/product.services"
import { TRPCError } from "@trpc/server"


export const getAllProductHandler = async () => {
  const data = await getAllProducts();
  console.log(data)
  if (!data) {
    throw new TRPCError({
      code: "NOT_FOUND",
    })
  }
  return {
    status: "success",
    data: data
  }
}
export const deleteProductHandler = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  const post = await deleteProduct(paramsInput.productId)
  if (!post) {
    throw new TRPCError({
      code: "NOT_FOUND"
    })
  }
  return {
    status: "success",
    message: "Deleted Successfully"
  }
}

export const createProductHandler = async ({
  inputData,
}: {
  inputData: createProductParamsInput;
}) => {
  const post = await createProduct(inputData)
  if (!post) {
    throw new TRPCError({
      code: "TIMEOUT"
    })
  }
  return {
    status: "success",
    message: "proudct created successfully"
  }
}