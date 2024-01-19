import { prisma } from "../dbclient"

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