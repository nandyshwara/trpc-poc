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
      <div className="w-full mx-auto">
        {productsData ? (
          <div className="w-11/12 flex flex-wrap mx-auto gap-5">
            {productsData.map((currEle: ProductData) => (
              <div className="w-[300px]">
                <ProductCard
                  key={currEle.id}
                  className="h-[400px] text-2xl bg-[#3198e7bf] px-5 py-5 rounded-xl shadow-2xl"
                  data={currEle}
                />
              </div>
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
