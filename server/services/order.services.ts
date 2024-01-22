import { createOrderParams } from "../schema/order.schema";
import { prisma } from "../dbclient"

export const createOrder = async (
    inputData: createOrderParams
) => {
    return prisma.order.create({
        data : inputData,
    })
};


export const getAllOrders = async (

) => {
    return prisma.order.findMany({
        include : {
            user : true,
            product : true
        }
    })
};

export const getOrderById = async (
    order_id: string
) => {
    return prisma.order.findUnique({
        where: {
            id: order_id
        },
        include: {
            user: true,
            product: true
        }
    })
};