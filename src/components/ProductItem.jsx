import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] ml-3">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrls[0].url}
          alt={product.name}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
           transition-scale duration-300"
        />
      </Link>
      <div className="p-3 flex hover:scale-105 transition duration-300 gap-36">
        <h3 className="truncate text-lg font-semibold text-red-950">
          {product.name}
        </h3>
        <p className="text-red-950 font-semibold">
          ${product.availableWeights[0].price}
        </p>
      </div>
    </div>
  );
}
