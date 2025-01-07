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
import blog1 from "../../../images/blog_img_1.png";
import blog2 from "../../../images/blog_img_2.png";
import blog3 from "../../../images/blog_img_3.png";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://down-under-brews-api.vercel.app/api"
    : "/api";

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

  const images = [
    { src: cafeGallery1, alt: "Cafe Gallery 1" },
    { src: cafeGallery2, alt: "Cafe Gallery 2" },
    { src: cafeGallery1, alt: "Cafe Gallery 1" },
    { src: cafeGallery2, alt: "Cafe Gallery 2" },
  ];

  return (
    <div>
      <div className="flex flex-col items-center gap-6 px-6 py-16 sm:py-20 text-red-950 max-w-6xl mx-auto">
        <h1 className="uppercase font-serif text-[15px] sm:text-lg md:text-3xl lg:text-5xl whitespace-nowrap text-center">
          Not just coffee, it's a taste of down under
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-center line-clamp-3">
          At Down Under Brews, we bring you premium, ethically sourced coffee
          beans from around the world, roasted to perfection in Melbourne.
          Discover the art of sustainable coffee crafted with passion and a
          touch of Aussie spirit.
        </p>
        <button className="bg-red-900 text-white uppercase px-4 py-2 sm:px-6 sm:py-3 rounded-md mt-6 font-semibold hover:scale-105 transition duration-300">
          Shop coffee blends
        </button>
        <div
          className="relative w-full h-[300px] sm:w-[600px] sm:h-[400px] md:w-[900px] md:h-[500px] lg:w-[1250px] lg:h-[617px] flex justify-center items-end rounded-md"
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
          className="w-full md:w-[652px] h-[390px] md:h-[673px] rounded-lg"
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
              className="flex-shrink-0 w-full h-[350px] lg:w-[1017px] lg:h-[674px] rounded-lg"
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
          <h1 className="text-[20px] sm:text-[36px] md:text-[50px] font-bold whitespace-nowrap uppercase flex items-center justify-center">
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

          <h3 className="text-[12px] sm:text-[14px] md:text-[16px] font-bold whitespace-nowrap uppercase flex items-center justify-center mt-3">
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

      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-[932px] max-w-lg p-5">
          <h1 className="text-[14px] md:text-[36px] font-semibold uppercase whitespace-nowrap flex items-center justify-center text-red-950">
            Sip, Savor,& Learn: The Down Under Brews Blog
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-3 flex flex-col gap-8 my-10">
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[300px]">
            <img
              src={blog1}
              alt="Blog Image"
              className="h-[353px] w-[395px] object-cover hover:scale-105 transition-scale duration-300"
            />

            <div className="p-3 flex flex-col hover:scale-105 transition duration-300 gap-2">
              <h3 className="text-lg font-semibold text-black">
                The Art of Coffee Brewing: A Beginner's Guide
              </h3>
              <p className="text-gray-500 text-[16px]">
                Brewing the perfect cup of coffee doesn't have to be daunting.
                At Down Under Brews, we’re here to simplify the process.
              </p>
            </div>
          </div>

          <div className="shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[300px]">
            <img
              src={blog2}
              alt="Blog Image"
              className="h-[353px] w-[395px] object-cover hover:scale-105 transition-scale duration-300"
            />

            <div className="p-3 flex flex-col hover:scale-105 transition duration-300 gap-2">
              <h3 className="text-lg font-semibold text-black">
                Sustainable Sips: Our Ethical Coffee Commitment
              </h3>
              <p className="text-gray-500 text-[16px]">
                Discover sustainability practices, from ethical sourcing to
                eco-friendly packaging, and see how your coffee choices can
                benefit the planet.
              </p>
            </div>
          </div>
          <div className="shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[300px]">
            <img
              src={blog3}
              alt="Blog Image"
              className="h-[353px] w-[395px] object-cover hover:scale-105 transition-scale duration-300"
            />

            <div className="p-3 flex flex-col hover:scale-105 transition duration-300 gap-2">
              <h3 className="text-lg font-semibold text-black">
                A Journey Through Australia’s Coffee Culture
              </h3>
              <p className="text-gray-500 text-[16px]">
                Australia boasts a rich coffee culture celebrated globally. In
                this post, we’ll take you through the history, unique trends,
                and local favorites.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-200 md:w-[1321px] md:h-[435px] mx-auto flex items-center justify-center">
        <div className="flex flex-col text-center">
          <h1 className="uppercase text-red-950 font-normal text-[40px]">
            Get in touch
          </h1>
          <p className="text-red-950 font-normal text-[16px] mt-2">
            We'd love to hear from you! Whether you have questions about our
            blends, want to share
            <br />
            your coffee experience, or need assistance, reach out to us.
          </p>
          <button
            className="uppercase text-orange-300 font-bold text-[16px] bg-red-950 px-6 py-3 rounded-lg mt-5 hover:scale-105 
          transition duration-300 w-auto self-center"
          >
            Send us a message
          </button>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
