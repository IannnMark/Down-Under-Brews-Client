import heroImage from "../../../images/hero_image.png";
import AboutUs from "./AboutUs";
export default function Home() {
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
    </div>
  );
}
