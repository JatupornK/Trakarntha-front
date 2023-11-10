import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNewDefaultPayment } from "../../stores/userSlice";

export default function PaymentItem() {
  const { defaultPayment, userAllPaymentMethods } = useSelector((state) => state.user);
  const dispatch = useDispatch();
//   console.log(defaultPayment);
// console.log(userAllPaymentMethods, defaultPayment)
  const compareFn = (a, b) => {
    return a.updatedAt < b.updatedAt ? 1 : -1;
  };
  let userPaymentMethods = userAllPaymentMethods.filter(
    (item) => item.id !== defaultPayment.id
  );
  // console.log(defaultPayment)
  useEffect(() => {
    let lastest = document.getElementById(`${defaultPayment.id}`);
    lastest.checked = true;
  }, []);
  return (
    <>
      <div className="row-span-6 overflow-y-auto">
        <div className="flex flex-row my-2 items-center gap-2 px-6">
          <input
            type="radio"
            id={defaultPayment.id}
            name="address"
            className="w-5 h-5 checked:accent-red-500 cursor-pointer"
            autoComplete="off"
              onChange={(e)=>dispatch(selectNewDefaultPayment({id:e.target.id}))}
          />
          <img
            src={
              defaultPayment.brand === "mastercard"
                ? `/Mastercard_logo.jpg`
                : "/visa_logo.jpg"
            }
            width={30}
            height={30}
          />
          **** **** **** {defaultPayment.last4}
        </div>
        <hr className="border-1 border-gray-200" />
        {userPaymentMethods.sort(compareFn).map((item, idx) => {
          return (
            <div key={idx}>
              <div className="flex flex-row px-6 my-2 items-center gap-2">
                <input
                  id={item.id}
                  type="radio"
                  name="address"
                  className="w-5 h-5 checked:accent-red-500 cursor-pointer"
                  autoComplete="off"
                  onChange={(e)=>{
                    dispatch(selectNewDefaultPayment({id:e.target.id}))
                  }}
                />
                <img
                  src={
                    item.brand === "mastercard"
                      ? `/Mastercard_logo.jpg`
                      : "/visa_logo.jpg"
                  }
                  width={30}
                  height={30}
                />
                **** **** **** {item.last4}
              </div>
              {(userPaymentMethods.length - 1 !== idx || userPaymentMethods.length < 9) && (
                <hr className="border-1 border-gray-200" />
              )}
            </div>
          );
        })}
      </div>
      <div className="row-span-1 flex items-center justify-center border-t border-gray-200">
        <button
          type="submit"
          className="bg-red-600 w-40 py-2 text-white text-lg hover:bg-red-400"
        >
          Confirm
        </button>
      </div>
    </>
  );
}
