import { ParamsInput, createOrderParams } from "../schema/order.schema";
import { createOrder, getAllOrders, getOrderById } from "../services/order.services";
import {TRPCError} from "@trpc/server"

export const createOrderController = async ({
    inputData,
  }: {
    inputData: createOrderParams;
  }) => {
    const post = await createOrder(inputData)
    if (!post) {
      throw new TRPCError({
        code: "TIMEOUT"
      })
    }
    return {
      status: "success",
      message: "Order created successfully"
    }
  }


  export const getAllOrderHandler = async () => {
    const data = await getAllOrders()
    if (!data) {
      throw new TRPCError({
        code: "TIMEOUT"
      })
    }
    return {
      data : data
    }
  }


  export const getOrderByIdHandler = async ({
    paramsInput,
  }: {
    paramsInput: ParamsInput;
  }) => {
    const data = await getOrderById(paramsInput.orderId)
    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND"
      })
    }
    return {
      status: "success",
      data : data
    }
  }