import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import * as userApi from "../../apis/user-api";
import { useEffect, useState } from "react";
import "./stripe.css";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
const CARD_OPTION = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      // fontWeigh: 500,
      // '-webkit-autofill':{color:'#fce883'},
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm({ onClose, price }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { userProfile } = useSelector((state) => state.user);
  console.log(userProfile)
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();   
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (error) {
        throw new Error(error.message);
      }
      const paymentMethodId = paymentMethod.id;
      // console.log(paymentMethod);

      //if(userProfile not have stripe_customer_id)
      //step2
      let customerId;
      if(!userProfile.stripeCustomerId){
        console.log('do create new customer')
        const customerRes = await userApi.createCustomer({
          paymentMethodId,
          name: userProfile.firstName,
          userId: userProfile.id,
        });
        if (customerRes.status === 201) {
          customerId = customerRes.data.customerId;
        }
        // console.log(customerId);
        const userPayment = await userApi.createUserPayment({paymentMethodId})
        // console.log(userPayment)
      }else{
        customerId=userProfile.stripeCustomerId
        const userPayment = await userApi.createUserPayment({paymentMethodId, customerId:userProfile.stripeCustomerId})
        // console.log(userPayment)
      }
      //step2.2
      

      // //step 3 // ย้ายไปอยู่ตอนกด submit form
      // const currency = "thb";
      // const paymentIntentRes = await userApi.createPaymentIntent({
      //   amount: price * 100,
      //   currency,
      //   paymentMethodId,
      //   customerId,
      // });
      // console.log(paymentIntentRes);
      // let clientSecret;
      // if (paymentIntentRes.status === 201) {
      //   clientSecret = paymentIntentRes.data.paymentIntent;
      // }

      // //step 4
      // const { paymentIntent, error2 } = await stripe.confirmCardPayment(
      //   clientSecret,
      //   { payment_method: paymentMethodId }
      // );
      // if (error2) {
      //   throw new Error(error2.message);
      // } else {
      //   console.log("Payment success", paymentIntent);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!success && (
        <div className="col-span-12 my-10">
          <form
            onSubmit={handleSubmitForm}
            className="w-full flex flex-col items-center justify-center"
          >
            <fieldset className="FormGroup w-4/5">
              <div className="FormRow">
                <CardElement options={CARD_OPTION} />
              </div>
            </fieldset>
            <button className="w-40 bg-red-600 p-2 text-white hover:bg-red-500">
              Save Card
            </button>
          </form>
        </div>
      )}
      <AiOutlineClose
        size={40}
        color="gray"
        className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
        onClick={onClose}
      />
    </>
  );
}
