import { AiOutlineEnvironment } from "react-icons/ai";
import CartAddressContent from "./CartAddressContent";
import CartChangeAddress from "./CartChangeAddress";
import CartAddNewAddress from "./CartAddNewAddress";
import { useSelector } from "react-redux";
export default function CartChooseAddress() {
  const { userProfile } = useSelector((state) => state.user);
  const lastestAddress = userProfile.Addresses.filter(
    (item) => item.lastest === true
  );
  console.log(userProfile.Addresses.length)
  return (
    <>
      {!userProfile.Addresses.length>0 ? (
        <div className="py-5">
          <CartAddNewAddress />
        </div>
      ) : (
        <div className="py-5">
          <div className="flex gap-2 text-lg items-center font-semibold">
            <AiOutlineEnvironment size={20} />
            Delivery Address
          </div>
          <div className="flex flex-col">
            <CartAddressContent lastestAddress={lastestAddress}/>
            <CartChangeAddress address={userProfile.Addresses}/>
          </div>
        </div>
      )}
    </>
  );
}
