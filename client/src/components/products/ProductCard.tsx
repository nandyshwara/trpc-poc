import productImage from "../../assets/images/watch_images.png";

interface ProductData {
  product_name?: string;
  price?: number;
  image_url?: string;
  quantity: number;
}

function ProductCard({
  className,
  data,
}: {
  className: string;
  data: ProductData;
}) {
  console.log("Data ", data);
  return (
    <div className={className}>
      <img className="rounded-xl" src={productImage} alt={productImage} />
      <p className="text-2xl font-bold">Product Name : {data.product_name}</p>
      <p>price : {data.price}</p>
      <p>Quantity : {data.quantity}</p>
    </div>
  );
}

export default ProductCard;
