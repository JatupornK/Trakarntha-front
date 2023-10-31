import { useState } from "react";
import { useSelector } from "react-redux";
import CartChooseAddress from "./CartChooseAddress";

export default function CartOrderSummaryContent() {
  const { cartData } = useSelector((state) => state.user);
  const [isUsePromo, setIsUsePromo] = useState(true);
  let sumTotalPrice = cartData
    .reduce((acc, item) => {
      return acc + +item.sumPrice;
    }, 0)
  let discount = 5000
  return (
    <div className="w-full">
      <div
        className={`flex justify-between p-1 ${isUsePromo ? "pt-5" : "py-5"}`}
      >
        <p>Subtotal</p>
        <p>฿ {sumTotalPrice.toLocaleString()}</p>
      </div>
      {isUsePromo && (
        <div className="flex justify-between p-1 py-5">
          <p>Discount</p>
          <p>- ฿ {discount.toLocaleString()}</p>
        </div>
      )}
      <hr className="w-full border-gray border-1"></hr>
      <div className="text-xl text-center flex justify-between p-1 py-5">
        <p>Total: </p>
        <p>฿ {(sumTotalPrice-discount).toLocaleString()}</p>
      </div>
      <hr className="w-full border-gray border-1"></hr>
      <CartChooseAddress />
      <button className="w-full bg-red-600 p-2 text-white hover:bg-red-400">
        Check Out
      </button>
    </div>
  );
}
