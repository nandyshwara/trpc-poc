import { prisma } from "../dbclient"
import { createProductParamsInput } from "../schema/product.schema";

export const deleteProduct = async (
    product_id: string
) => {
    console.log(product_id)
    return prisma.product.delete({
        where: { id: product_id }, 
        include: {
            orders: true,
        },
    })
};

export const createProduct = async (
    inputData: createProductParamsInput
) => {
    return prisma.product.create({
        data : inputData,
    })
};

export const getAllProducts = async() =>{
    const data = await prisma.product.findMany()
    return data
}