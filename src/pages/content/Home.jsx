import ProductItem from "../../components/ProductItem";
import { useEffect, useState } from "react";
import heroImage from "../../../images/hero_image.png";
import AboutUs from "./AboutUs";
import farmerImage from "../../../images/farmer_image.png";
import cafeGallery1 from "../../../images/cafe_gallery_1.png";
import cafeGallery2 from "../../../images/cafe_gallery_2.png";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import igPost1 from "../../../images/ig_post_1.png";
import igPost2 from "../../../images/ig_post_2.png";
import igPost3 from "../../../images/ig_post_3.png";
import igPost4 from "../../../images/ig_post_4.png";

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

  const images = [
    { src: cafeGallery1, alt: "Cafe Gallery 1" },
    { src: cafeGallery2, alt: "Cafe Gallery 2" },
    { src: cafeGallery1, alt: "Cafe Gallery 1" },
    { src: cafeGallery2, alt: "Cafe Gallery 2" },
  ];

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

          <button className="bg-orange-300 text-red-950 rounded-lg uppercase px-3 py-2 hover:scale-105 transition duration-300 text-[16px] font-semibold">
            Find Out Why We're Unique
          </button>
        </div>

        <div
          className="w-full md:w-[652px] h-[300px] md:h-[673px] rounded-lg"
          style={{
            backgroundImage: `url(${farmerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center text-red-950">
        <div className="max-w-lg p-5">
          <h1 className="text-[24px] md:text-[48px] font-semibold text-center">
            Discover Our Café
          </h1>
          <p className="text-[14px] md:text-[16px] font-normal text-center mt-5">
            <span className="whitespace-nowrap">
              Step into our Melbourne roastery and enjoy the warm atmosphere of
              a local coffee shop.
            </span>
            <br />
            <span className="whitespace-nowrap ml-5">
              Meet fellow coffee lovers, learn about the craft, and savor a brew
              made just for you.
            </span>
          </p>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto my-10">
        <div className="flex overflow-x-scroll space-x-4 p-3 scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[1017px] h-[674px] md:w-[900px] rounded-lg"
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
              }}
            >
              <span className="sr-only">{image.alt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center text-red-950">
        <div className="max-w-lg p-5">
          <h1 className="text-[50px] md:text-[48px] font-bold whitespace-nowrap uppercase flex items-center justify-center">
            Connect with us on Instagram!
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-950">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-white hover:text-pink-600 h-6 w-6"
              />
            </div>
          </div>

          <h3 className="text-[16px] md:text-[12px] font-bold whitespace-nowrap uppercase flex items-center justify-center mt-3">
            Down Under Brews
          </h3>
          <div className="flex flex-row justify-center items-center space-x-4 mt-5">
            <img
              src={igPost1}
              alt="Instagram Image "
              className="flex-shrink-0 w-[402px] h-[402px] rounded-lg"
            />
            <img
              src={igPost2}
              alt="Instagram Image "
              className="flex-shrink-0 w-[402px] h-[402px] rounded-lg"
            />
            <img
              src={igPost3}
              alt="Instagram Image "
              className="flex-shrink-0 w-[402px] h-[402px] rounded-lg"
            />
            <img
              src={igPost4}
              alt="Instagram Image "
              className="flex-shrink-0 w-[402px] h-[402px] rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center text-center justify-center uppercase mt-5 border border-black rounded-lg p-2">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-black hover:text-pink-600 h-5 w-5"
              />
              <span className="ml-2 text-sm">Follow us on Instagram</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
