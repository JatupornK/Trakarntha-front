import { useDispatch, useSelector } from "react-redux";
import CartContainer from "../features/Carts/CartContainer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setOrderSuccess } from "../stores/userSlice";
import {AiFillCheckCircle} from 'react-icons/ai'
export default function CartPage() {
  const { cartData, orderSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrderSuccess(false));
    window.scrollTo(0, 0);
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <>
      {cartData.length > 0 ? (
        <CartContainer />
      ) : (
        <div className="relative flex flex-col justify-center items-center">
          {orderSuccess ? (
            <>
            <AiFillCheckCircle className="mt-20" color="green" size={50} />
            <h1 className="mt-5 text-3xl text-gray-600">Your order success</h1>
            </>
          ) : (
            <>
              <h1 className="mt-20 text-2xl text-gray-600">
                You don't have any product in the cart
              </h1>
              <Link
                to={"/all-products"}
                className="mt-4 text-2xl text-blue-500 underline underline-offset-2 hover:text-blue-400"
              >
                Let's shopping now
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
