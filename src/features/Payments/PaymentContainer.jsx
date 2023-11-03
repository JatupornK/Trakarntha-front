import { useSelector } from "react-redux";
import CartAddPaymentMethod from "../Carts/CartAddPaymentMethod";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useEffect } from "react";
import * as userApi from "../../apis/user-api";
import { useDispatch } from "react-redux";
import { setDefaultPayment } from "../../stores/userSlice";
import PaymentContent from "./PaymentContent";

export default function PaymentContainer({ price }) {
  const dispatch = useDispatch();
  const { defaultPayment } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserPaymentMethod = async () => {
      try {
        const {
          data: { last4, brand, allPaymentMethods },
        } = await userApi.getLastFour();
        if (!last4 || !brand || !allPaymentMethods)
          throw new Error("Can not load user payment");
        dispatch(setDefaultPayment({ last4, brand }));
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

      <CartAddPaymentMethod price={price} />
    </div>
  );
}
