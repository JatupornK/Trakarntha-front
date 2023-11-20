import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import * as userApi from "../../apis/user-api";
import "./stripe.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPayment,
  selectNewDefaultPayment,
  setDefaultPayment,
  setError,
  setNewStripeCustomer,
} from "../../stores/userSlice";
import {toast} from 'react-toastify'
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
  disableLink: true
};

export default function PaymentForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
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
      dispatch(selectNewDefaultPayment({id:paymentMethod.id}))
      const paymentMethodId = paymentMethod.id;
      // console.log(paymentMethod);
      //if(userProfile not have stripe_customer_id)
      //step2
      let userPayment;
      if (!userProfile.stripeCustomerId) {
        const customerRes = await userApi.createCustomer({
          paymentMethodId,
          name: userProfile.firstName,
          userId: userProfile.id,
        });
        if (customerRes.status === 201) {
          dispatch(setNewStripeCustomer(customerRes.data.customerId));
        }
        // console.log(customerId);
        userPayment = await userApi.createUserPayment({
          paymentMethodId,
          customerId: customerRes.data.customerId,
        });
        // console.log(userPayment)
      } else {
        userPayment = await userApi.createUserPayment({
          paymentMethodId,
          customerId: userProfile.stripeCustomerId,
        });
        // console.log(userPayment)
      }

      if (userPayment) {
        let newPayment = {
          last4: paymentMethod.card.last4,
          brand: paymentMethod.card.brand,
          createdAt: paymentMethod.created,
          id: paymentMethod.id
        };
        dispatch(setError({payment:''}))
        dispatch(setDefaultPayment(newPayment));
        dispatch(addNewPayment(newPayment));
        // dispatch(selectNewDefaultPayment())
        onClose();
      }

    } catch (err) {
      toast.error(err.response.data.message)
      onClose()
      console.log(err);
    }
  };
  return (
    <>
      <div className="col-span-12 mt-10 mb-7">
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
      <AiOutlineClose
        size={30}
        color="gray"
        className="absolute right-1 top-2 hover:bg-gray-100 rounded-lg p-1 mr-2 cursor-pointer"
        onClick={onClose}
      />
    </>
  );
}
