import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartChooseAddress from "./CartChooseAddress";
import PaymentContainer from "../Payments/PaymentContainer";
import * as userApi from "../../apis/user-api";
import { useStripe } from "@stripe/react-stripe-js";
import { resetCartData, setOrderSuccess, setUserProfile } from "../../stores/userSlice";

export default function CartOrderSummaryContent() {
  const { cartData } = useSelector((state) => state.user);
  // const [isUsePromo, setIsUsePromo] = useState(false); //ต้องทำโปรโมด้วย
  const { newSelectedAddressId, defaultPayment, userProfile } = useSelector(
    (state) => state.user
  );
  const stripe = useStripe();
  const dispatch = useDispatch();
    console.log(cartData)
  let sumTotalPrice = cartData.reduce((acc, item) => {
    return acc + +item.sumPrice;
  }, 0);
  let discount;
  let sumAfterDiscount;
  if(userProfile.Membership!==null){
    discount = 0.1
    sumAfterDiscount = sumTotalPrice-(sumTotalPrice*discount)
  }
  // let discount = 5000;
  // let price = sumTotalPrice - discount;
  console.log(defaultPayment, userProfile);
  // console.log(newSelectedAddressId);

  const handleClickCheckout = async () => {
    try {
      //create payment intent
      const currency = "thb";
      const amount = discount? sumAfterDiscount:sumTotalPrice
      const paymentIntentRes = await userApi.createPaymentIntent({
        amount:amount*100,
        currency,
        paymentMethodId: defaultPayment.id,
        customerId: userProfile.stripeCustomerId,
      });
      let clientSecret;
      if (paymentIntentRes.status === 201) {
        clientSecret = paymentIntentRes.data.paymentIntent;
      }

      //create order in database
      const order = await userApi.createOrder({
        paymentId: defaultPayment.id,
        addressId: newSelectedAddressId.id,
        userId: userProfile.id,
      });
      //check payment status
      const { paymentIntent, error2 } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: defaultPayment.id }
      );
      if (error2) {
        throw new Error(error2.message);
      }
      if (paymentIntent.status === "succeeded") {
        const res = await userApi.paymentSuccess({
          orderId: order.data.orderId,
          totalBought: userProfile.totalBought,
          sumTotalPrice: amount
        });
        if (res.status === 201) {
          console.log(res)
          let totalBought = {totalBought:userProfile.totalBought+amount}
          dispatch(setUserProfile({...userProfile, ...res.data, ...totalBought}))
          dispatch(resetCartData());
          dispatch(setOrderSuccess(true));
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`flex justify-between p-1 ${discount ? "pt-5" : "py-5"}`}
      >
        <p>Subtotal</p>
        <p>฿ {sumTotalPrice.toLocaleString()}</p>
      </div>
      {discount && (
        <div className="flex justify-between p-1 py-5">
          <p>Exclusive Membership</p>
          <p>- ฿ {(sumTotalPrice*discount).toLocaleString()}</p>
        </div>
      )}
      <hr className="w-full border-gray border-1"></hr>
      <div className="text-xl text-center flex justify-between p-1 py-5">
        <p>Total: </p>
        <p>฿ {discount? sumAfterDiscount.toLocaleString():sumTotalPrice.toLocaleString()}</p>
      </div>
      <hr className="w-full border-gray border-1"></hr>
       <CartChooseAddress />
      <hr className="w-full border-gray border-1"></hr>
      <PaymentContainer price={discount? sumAfterDiscount:sumTotalPrice} />
      <button
        className="w-full bg-red-600 p-2 text-white hover:bg-red-400"
        onClick={handleClickCheckout}
      >
        Check Out
      </button> 
    </div>
  );
}
