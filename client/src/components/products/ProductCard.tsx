import React from 'react'


interface ProductData {
    product_name?: string;
    price?: number;
    image_url?: string;
    quantity : number;
  }

function ProductCard({className,data} : {className : string , data : ProductData}) {
    console.log("Data " ,data)
  return (
    <div className={className}>
        <p>Product Name : {data.product_name}</p>
        <p>price : {data.price}</p>
        <p>Qunatity : {data.quantity}</p>
    </div>
  )
}

export default ProductCard