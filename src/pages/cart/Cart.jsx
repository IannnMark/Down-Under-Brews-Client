import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  increaseQty,
  decreaseQty,
} from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleIncreaseQty = (id) => {
    dispatch(increaseQty(id));
  };

  const handleDecreaseQty = (id) => {
    dispatch(decreaseQty(id));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOutHandler = () => {
    if (currentUser) {
      navigate("/confirm");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <Fragment>
      <h1 className="text-2xl font-semibold text-center mt-6">You Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-lg font-medium">You Cart is Empty</h2>
          <button
            className="bg-red-950 text-white p-3 rounded-lg text-xl hover:opacity-95 disabled:opacity-80 mt-5"
            onClick={() => navigate("/shop")}
          >
            Buy Coffee
          </button>
        </div>
      ) : (
        <Fragment>
          <h2 className="text-lg font-medium mt-6">
            Coffee List: <b>{cartItems.length}</b>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
              {cartItems.map((item) => (
                <Fragment key={item._id}>
                  <div className="p-4 border border-gray-400 rounded mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image ? item.image : "fallback-image-url"}
                        alt={item.name}
                        className="w-20 h-20"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <h3 className="font-medium">{item.roastLevel}</h3>
                        <h3 className="font-medium">{item.weight}</h3>
                        <h3 className="font-medium">${item.price}</h3>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDecreaseQty(item._id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center border border-gray-300"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => handleIncreaseQty(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded my-2"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="p-4 border border-gray-300 rounded">
              <h4 className="text-lg font-medium">Order Summary</h4>
              <p className="mt-2">
                Number of purchases:{" "}
                <span className="font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </p>
              <p className="mt-2">
                Est. total:{" "}
                <span className="font-semibold">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </span>
              </p>
              <button
                className="bg-red-950 text-white py-2 px-4 mt-4 rounded w-full hover:bg-gray-800"
                onClick={checkOutHandler}
              >
                Check out
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
