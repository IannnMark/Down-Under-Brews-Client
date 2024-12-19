import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="bg-gray-300 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] ml-3">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
      </div>
      <button className="text-xl text-white bg-black rounded-md ml-28 hover:bg-gray-800 px-2">
        Add to Cart
      </button>
    </div>
  );
}
