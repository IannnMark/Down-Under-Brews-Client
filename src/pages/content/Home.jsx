import ProductItem from "../../components/ProductItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../../images/hero_image.png";
import AboutUs from "./AboutUs";
import farmerImage from "../../../images/farmer_image.png";
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

      <div className="flex flex-col md:flex-row justify-center md:p-16">
        <div className="max-w-lg p-10 bg-red-950 text-orange-300 md:flex-row rounded-lg">
          <h1 className="text-[24px] md:text-[50px] font-bold text-left my-10">
            More Than Just a Brew - It's a Commitment
          </h1>
          <p className="text-left font-normal my-7 text-[14px] md:text-[16px]">
            We believe great coffee should do more than just taste good. That's
            why we prioritize ethical sourcing and environmentally friendly
            practices.
          </p>
          <p className="text-left font-normal my-7 text-[14px] md:text-[16px]">
            From our sustainable packaging to supporting fair-trade farmers, we
            aim to make every sip count.
          </p>
        </div>

        <div
          className="w-full mg:w-[652px] h-[300px] md:h-[673px] rounded-lg"
          style={{
            backgroundImage: `url(${farmerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>

      <div className="">
        <div></div>
      </div>
    </div>
  );
}
