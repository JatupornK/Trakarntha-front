import { AiOutlineClose } from "react-icons/ai";
import CartAddressItem from "./CartAddressItem";

export default function CartModalChooseAddress ({onClose, address}) {
    return (
        <div className="min-w-0 min-h-0 col-span-12 grid grid-rows-1">
        <div className="px-7 py-4 flex flex-col row-span-1">
          <p className="font-semibold text-xl">My Address</p>
          <hr className="border-1 border-gray-200 mt-2" />
          {/* <CartModalAddNewAddress onSuccess={handleClickCloseAddNewAddress} /> */}
          <CartAddressItem address={address}/>
        </div>
        <AiOutlineClose
          size={40}
          color="gray"
          className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
          onClick={onClose}
        />
      </div>
    )
}