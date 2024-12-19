import ProductItem from "../../components/ProductItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../../images/hero_image.png";
import AboutUs from "./AboutUs";
export default function Home() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const productsPerPage = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        prevIndex + productsPerPage,
        recentProducts.length - productsPerPage
      )
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - productsPerPage, 0));
  };

  useEffect(() => {
    const recentProducts = async () => {
      try {
        const res = await fetch(
          `/api/product/get/products/?limit=&&sort=createdAt&order=desc`
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
    <div>
      <div className="flex flex-col items-center gap-6 p-28 text-red-950 max-w-6xl mx-auto">
        <h1 className="uppercase font-serif text-5xl lg:text-5xl whitespace-nowrap overflow-hidden text-ellipsis">
          Not just coffee, it's a taste of down under
        </h1>
        <p className="text-[17px] font-medium text-center text-sm sm:text-base md:text-lg line-clamp-2">
          At Down Under Brews, we bring you premium, ethically sourced coffee
          beans from around the world, roasted to perfection in Melbourne.
          Discover the art of sustainable coffee crafted with passion and a
          touch of Aussie spirit.
        </p>
        <button className="bg-red-900 text-white uppercase px-3 py-2 rounded-md mt-6 font-semibold hover:scale-105 transition duration-300">
          Shop coffee blends
        </button>
        <div
          className="relative w-[1250px] h-[617px] flex justify-center items-end rounded-md"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>

   
      <AboutUs />

      <div className="max-w-5xl mx-auto p-3 flex flex-col gap-8 my-10">
        <div className="flex justify-start">
          <div className="text-left">
            <h1 className="text-5xl uppercase font-semibold text-red-950">
              Explore our signature blends
            </h1>
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              className="bg-white text-red-950 p-2 rounded-lg border border-red-950"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="bg-white text-red-950 p-2 rounded-lg border border-red-950"
              onClick={handleNext}
              disabled={currentIndex + productsPerPage >= recentProducts.length}
            >
              &gt;
            </button>
          </div>
        </div>
        {recentProducts && recentProducts.length > 0 && (
          <div className="relative">
            <div className="flex flex-row gap-8">
              {recentProducts
                .slice(currentIndex, currentIndex + productsPerPage)
                .map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-6 p-16 text-red-950"></div>
    </div>
  );
}
