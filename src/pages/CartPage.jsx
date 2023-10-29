import { useSelector } from "react-redux";
import CartContainer from "../features/Carts/CartContainer";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartData } = useSelector((state) => state.user);
  return (
    <>
      {cartData.length > 0 ? (
        <CartContainer />
      ) : (
        <div className="relative flex flex-col justify-center items-center">
          <h1 className="mt-20 text-2xl text-gray-600">
            You don't have any product in the cart
          </h1>
          <Link to={'/all-products'} className="mt-4 text-2xl text-blue-500 underline underline-offset-2 hover:text-blue-400">
              Let's shopping now
          </Link>
        </div>
      )}
    </>
  );
}
