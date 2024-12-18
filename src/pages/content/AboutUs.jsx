import aboutImage1 from "../../../images/about_img_1.png";
import aboutImage2 from "../../../images/about_img_2.png";
import aboutImage3 from "../../../images/about_img_3.png";
export default function AboutUs() {
  return (
    <div>
      <div className="flex flex-row items-center gap-6 p-16 text-orange-300 bg-red-950 mt-[-70px]">
        <div className="flex flex-row items-center gap-6 p-16 mt-[-60px] mx-64">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center font-bold">
              <h1 className="text-6xl">15</h1>
              <span className="text-lg ml-1">+</span>
            </div>
            <p className="text-sm text-center">Years of roasting experience</p>
          </div>
          <div className="h-24 border-l-2 border-orange-300 mx-10"></div>
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center font-bold">
              <h1 className="text-6xl">50 </h1>
              <span className="text-lg ml-1">+</span>
            </div>
            <p className="text-sm text-center">Unique coffee blends crafted</p>
          </div>
          <div className="h-24 border-l-2 border-orange-300 mx-10"></div>
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center font-bold">
              <h1 className="text-6xl">1,200</h1>
              <span className="text-lg ml-1">+</span>
            </div>
            <p className="text-sm text-center">Satisfied customers served</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row p-16 text-orange-300 bg-red-950 mt-[-110px]">
        <div className="flex-1 text-left">
          <h1 className="text-[43px] font-semibold leading-normal">
            <span className="inline">From Bean to Brew - Meet Down</span>
            <br /> <span className="block">Under Brews</span>
          </h1>
          <p className="text-[16px] font-normal mt-10">
            Born in Melbourne, Down Under Brews embodies the essence of
            Australian coffee culture. We take pride in roasting coffee that's
            not just a drink, but a connection to the craft.
          </p>
          <br />
          <p className="text-[16px] font-normal">
            Our blends are sustainably sourced, carefully crafted, and inspired
            by the natural beauty of the land down under.
          </p>
          <br />
          <p className="text-[16px] font-normal">
            We strive to support local communities and promote eco-friendly
            practices. Every cup reflects our dedication to quality,
            sustainability, and the unique culture that defines Australian
            coffee.
          </p>

          <div className="mt-10">
            <button className="text-red-950 uppercase text-[16px] font-semibold bg-orange-300 rounded-lg px-3 py-2 hover:scale-105 transition duration-300">
              Our Story
            </button>
            <button className="text-orange-300 uppercase text-[16px] font-semibold ml-5 border border-gray-300 rounded-lg px-3 py-2 hover:scale-105 transition duration-300">
              Meet the Roasters
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 mt-28">
          <div
            className="w-[315px] h-[354px] rounded-md"
            style={{
              backgroundImage: `url(${aboutImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}
          ></div>
          <div
            className="w-[315px] h-[190px] rounded-md"
            style={{
              backgroundImage: `url(${aboutImage2})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-4 ml-5">
          <div
            className="w-[482px] h-[626px] rounded-md"
            style={{
              backgroundImage: `url(${aboutImage3})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
