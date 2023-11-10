import { AiOutlineEnvironment } from "react-icons/ai";
import CartAddressContent from "./CartAddressContent";
import CartChangeAddress from "./CartChangeAddress";
import CartAddNewAddress from "./CartAddNewAddress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectNewAddress } from "../../stores/userSlice";
export default function CartChooseAddress() {
  const { userProfile, haveAddressPayment } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const lastestAddress = userProfile.Addresses.filter(
    (item) => item.lastest === true
  );
  useEffect(() => {
    console.log(lastestAddress);
    if (userProfile.Addresses.length > 0) {
      dispatch(selectNewAddress({ id: +lastestAddress[0].id }));
    }
  }, []);
  return (
    <>
      <div className="py-5">
        <div className="flex gap-2 text-lg items-center font-semibold ">
          <AiOutlineEnvironment size={20} />
          Delivery Address
        </div>
        {!userProfile.Addresses.length > 0 ? (
          <div className="mt-2">
            <CartAddNewAddress />
          </div>
        ) : (
          <div className="flex flex-col">
            <CartAddressContent lastestAddress={lastestAddress} />
            <div className="flex justify-between">
              <CartAddNewAddress />
              <CartChangeAddress address={userProfile.Addresses} />
            </div>
          </div>
        )}
        {haveAddressPayment.address && <div className="text-xs text-red-600 mt-2 text-center">{haveAddressPayment.address}</div>}
      </div>
    </>
  );
}
