import { useEffect, useState } from "react";
import { client } from "../../client";
import ProductCard from "./ProductCard";

interface ProductData {
  id?: string;
  product_name?: string;
  price?: number;
  image_url?: string;
  quantity: number;
}

function AllProducts() {
  const [productsData, setProductsData] = useState<ProductData[] | null>(null);

  const getAllProducts = async () => {
    const data = await client.products.getAll.query();
    setProductsData(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="text-8xl">
      <div className="w-10/12 mx-auto">
        {productsData ? (
          <div className="flex flex-row gap-5">
            {productsData.map((currEle: ProductData) => (
              <ProductCard
                key={currEle.id}
                className="basis-1/4 text-2xl bg-[#0B60B0] px-5 py-5 rounded-xl shadow-2xl"
                data={currEle}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
