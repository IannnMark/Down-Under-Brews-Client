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
      {cartItems.length ===
        0 >
        (
          <div className="text-center mt-10">
            <h2 className="text-lg font-medium">You Cart is Empty</h2>
            <button
              className="bg-red-950 text-white p-3 rounded-lg text-xl hover:opacity-95 disabled:opacity-80 mt-5"
              onClick={() => navigate("/shop")}
            >
              Buy Coffee
            </button>
          </div>
        )}
    </Fragment>
  );
}
