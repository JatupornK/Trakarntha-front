import { AiOutlineEnvironment } from "react-icons/ai";
import CartAddressContent from "./CartAddressContent";
import CartChangeAddress from "./CartChangeAddress";
import CartAddNewAddress from "./CartAddNewAddress";
export default function CartChooseAddress() {
  return (
    <>
      {true ? (
        <div className="py-5">
          <CartAddNewAddress />
        </div>
      ) : (
        <div className="py-5">
          <div className="flex gap-2 text-lg items-center">
            <AiOutlineEnvironment size={20} />
            Delivery Address
          </div>
          <div className="flex flex-col">
            <CartAddressContent />
            <CartChangeAddress />
          </div>
        </div>
      )}
    </>
  );
}
