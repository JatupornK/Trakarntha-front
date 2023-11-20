import { useSelector } from "react-redux";
import CartAddPaymentMethod from "../Carts/CartAddPaymentMethod";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useEffect } from "react";
import * as userApi from "../../apis/user-api";
import { useDispatch } from "react-redux";
import {
  selectNewDefaultPayment,
  setAllUserPaymentMethods,
  setDefaultPayment,
} from "../../stores/userSlice";
import PaymentContent from "./PaymentContent";
import PaymentChangePayment from "./PaymentChangePayment";

export default function PaymentContainer() {
  const dispatch = useDispatch();
  const { defaultPayment, userProfile, haveAddressPayment } = useSelector(
    (state) => state.user
  );
  console.log(defaultPayment)
  // console.log(defaultPayment);
  // console.log(price)
  useEffect(() => {
    const fetchUserPaymentMethod = async () => {
      try {
        if (userProfile.stripeCustomerId) {
          const {
            data: { lastestPayment, allPaymentMethods },
          } = await userApi.getLastFour();
          console.log(lastestPayment)
          console.log(allPaymentMethods)
          if (!lastestPayment || !allPaymentMethods) {
            throw new Error("Can not load user payment");
          }
          // console.log(lastestPayment)
          // console.log(allPaymentMethods)
          dispatch(setDefaultPayment(lastestPayment));
          dispatch(setAllUserPaymentMethods(allPaymentMethods));
          dispatch(selectNewDefaultPayment(lastestPayment.id));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUserPaymentMethod();
  }, []);
  return (
    <div className="py-5">
      <div className="flex gap-2 text-lg items-center font-semibold">
        <AiOutlineCreditCard />
        Payment Method
      </div>
      {defaultPayment.last4 && defaultPayment.brand && (
        <PaymentContent defaultPayment={defaultPayment} />
      )}
      <div
        className={`flex flex-row ${
          defaultPayment.last4 && defaultPayment.brand
            ? "justify-between"
            : "justify-center"
        }`}
      >
        <CartAddPaymentMethod />
        {defaultPayment.last4 && defaultPayment.brand && (
          <PaymentChangePayment />
        )}
      </div>
      {haveAddressPayment.payment && (
        <div className="text-xs text-red-600 mt-2 text-center">
          {haveAddressPayment.payment}
        </div>
      )}
    </div>
  );
}
