import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/product/${params.productId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProduct(data);
        if (data.availableWeights && data.availableWeights.length > 0) {
          setSelectedWeight(data.availableWeights[0].weight);
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };

  const selectedWeightObject = product
    ? product.availableWeights.find(
        (weight) => weight.weight === selectedWeight
      )
    : null;

  const totalPrice = selectedWeightObject
    ? selectedWeightObject.price * quantity
    : 0;

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong </p>
      )}

      {product && !loading && !error && (
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <Carousel>
              {product.imageUrls.map((image) => (
                <div
                  key={image.public_id}
                  className="w-full h-[400px] md:w-[723px] md:h-[831px] bg-cover bg-center my-14 ml-14"
                  style={{
                    background: `url(${image.url})  no-repeat `,
                    backgroundSize: "contain",
                  }}
                ></div>
              ))}
            </Carousel>
          </div>
          <div className="flex-1 text-right p-5 text-red-950">
            <h1 className="font-bold text-[30px] md:text-[50px] my-12 text-left ">
              {product.name}
            </h1>

            <div className="flex justify-between">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Select size:
              </p>
              <select
                className="border border-gray-400 rounded px-3 py-1 mt-2"
                value={selectedWeight}
                onChange={handleWeightChange}
              >
                {product.availableWeights.map((weight) => (
                  <option key={weight.weight} value={weight.weight}>
                    {weight.weight} - {weight.stock} in stock
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Quantity:
              </p>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 border border-gray-400 rounded-l"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-t border-b border-gray-400"
                />
                <button
                  className="px-3 py-1 border border-gray-400 rounded-r"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Description:
              </p>
              <p className="text-[16px] md:text-[20px] font-semibold">
                {product.description}
              </p>
            </div>
            <hr className="border-gray-400 my-2" />
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Category:
              </p>
              <p className="text-[16px] md:text-[20px] font-semibold">
                {product.category}
              </p>
            </div>
            <hr className="border-gray-400 my-2" />
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Geography:
              </p>
              <p className="text-[16px] md:text-[20px] font-semibold">
                {product.origin}
              </p>
            </div>
            <hr className="border-gray-400 my-2" />
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Roast Level:
              </p>
              <p className="text-[16px] md:text-[20px] font-semibold">
                {product.roastLevel}
              </p>
            </div>
            <hr className="border-gray-400 my-2" />
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Processing:
              </p>
              <p className="text-[16px] md:text-[20px] font-semibold">
                {product.processingMethod}
              </p>
            </div>
            <hr className="border-gray-400 my-2" />
            <div className="flex justify-between mt-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Certifications:
              </p>
              <p className="text-[16px] md:text-[20px] font-semibold">
                {product.certifications}
              </p>
            </div>
            <hr className="border-gray-400 my-2" />

            <div className="flex justify-between my-7">
              <p className="text-[16px] md:text-[20px] font-semibold">
                ${totalPrice.toFixed(2)} / {selectedWeight}
              </p>
              <button className="bg-red-900 text-white uppercase px-3 py-2 rounded-md font-semibold hover:scale-105 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
