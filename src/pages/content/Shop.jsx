import ProductItem from "../../components/ProductItem";
import { useEffect, useState } from "react";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://down-under-brews-api.vercel.app/api"
    : "/api";

export default function Shop() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const recentProducts = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/product/get/products/?limit=&&sort=createdAt&order=desc`
        );
        const data = await res.json();
        setRecentProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    recentProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      {recentProducts && recentProducts.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-8">
            {recentProducts.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
