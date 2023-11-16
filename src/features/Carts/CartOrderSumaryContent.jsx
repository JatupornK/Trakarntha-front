import { useDispatch, useSelector } from "react-redux";
import CartChooseAddress from "./CartChooseAddress";
import PaymentContainer from "../Payments/PaymentContainer";
import * as userApi from "../../apis/user-api";
import { useStripe } from "@stripe/react-stripe-js";
import {
  resetCartData,
  setError,
  setOrderSuccess,
  setUserProfile,
} from "../../stores/userSlice";
import { toast } from "react-toastify";

export default function CartOrderSummaryContent() {
  // const { cartData,userProfile } = useSelector((state) => state.user);
  // const [isError, setIsError] = useState({address:'',payment:''});
  // const [isUsePromo, setIsUsePromo] = useState(false); //ต้องทำโปรโมด้วย
  const { newSelectedAddressId, defaultPayment, userProfile,cartData } = useSelector(
    (state) => state.user
  );
  const stripe = useStripe();
  const dispatch = useDispatch();
  // console.log(cartData);
  let sumTotalPrice = cartData.reduce((acc, item) => {
    return acc + +item.sumPrice;
  }, 0);
  let discount;
  let sumAfterDiscount;
  if (userProfile.Membership !== null) {
    discount = 0.1;
    sumAfterDiscount = sumTotalPrice - sumTotalPrice * discount;
  }
  const handleClickCheckout = async () => {
    try {
      if(userProfile.role==='admin'){
        toast.error('Admin can not add an order')
        return;
      }
      if(userProfile.Addresses.length===0||defaultPayment.id===''){
        if(defaultPayment.id===''){
          dispatch(setError({payment: 'Please add the payment before check out'}))
        }
        if(userProfile.Addresses.length===0){
          dispatch(setError({address: 'Please add the address before check out'}))
        }
        throw new Error('Fail ja')
      }
      //create payment intent
      const currency = "thb";
      const amount = discount ? sumAfterDiscount : sumTotalPrice;
      const paymentIntentRes = await userApi.createPaymentIntent({
        amount: amount * 100,
        currency,
        paymentMethodId: defaultPayment.id,
        customerId: userProfile.stripeCustomerId,
      });
      let paymentIntentId;
      if (paymentIntentRes.status === 201) {
        paymentIntentId = paymentIntentRes.data.paymentIntentId;
      }

      //create order in database
      const order = await userApi.createOrder({
        paymentId: defaultPayment.id,
        addressId: newSelectedAddressId.id,
        userId: userProfile.id,
        price: amount
      });
      //check payment status
      const { paymentIntent, error2 } = await stripe.confirmCardPayment(
        paymentIntentId,
        { payment_method: defaultPayment.id }
      );
      if (error2) {
        throw new Error(error2.message);
      }
      if (paymentIntent.status === "succeeded") {
        const res = await userApi.paymentSuccess({
          orderId: order.data.orderId,
          totalBought: userProfile.totalBought,
          sumTotalPrice: amount,
        });
        if (res.status === 201) {
          console.log(res);
          let totalBought = { totalBought: userProfile.totalBought + amount };
          dispatch(
            setUserProfile({ ...userProfile, ...res.data, ...totalBought })
          );
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
      <div className={`flex justify-between p-1 ${discount ? "pt-5" : "py-5"}`}>
        <p>Subtotal</p>
        <p>฿ {sumTotalPrice.toLocaleString()}</p>
      </div>
      {discount && (
        <div className="flex justify-between p-1 py-5">
          <p>Exclusive Membership</p>
          <p>- ฿ {(sumTotalPrice * discount).toLocaleString()}</p>
        </div>
      )}
      <hr className="w-full border-gray border-1"></hr>
      <div className="text-xl text-center flex justify-between p-1 py-5">
        <p>Total: </p>
        <p>
          ฿
          {discount
            ? sumAfterDiscount.toLocaleString()
            : sumTotalPrice.toLocaleString()}
        </p>
      </div>
      <hr className="w-full border-gray border-1"></hr>
      <CartChooseAddress/>
      <hr className="w-full border-gray border-1"></hr>
      <PaymentContainer/>
      <button
        className={`w-full bg-red-600 p-2 text-white ${userProfile.role!=='admin'&&'hover:bg-red-400'}`}
        onClick={handleClickCheckout}
        // disabled={userProfile.role==='admin'? true: false}
      >
        Check Out
      </button>
    </div>
  );
}
