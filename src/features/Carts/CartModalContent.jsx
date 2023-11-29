import { AiOutlineClose } from "react-icons/ai";
// import CartModalAddNewAddress from "./CartModalAddNewAddress";
// import { useDispatch } from "react-redux";
// import { resetInputErrorCreateAddress } from "../../stores/userSlice";

export default function CartModalContent({ onClose, children, text }) {
  // const dispatch = useDispatch();
  // const handleClickCloseAddNewAddress = () => {
  //   onClose();
  //   dispatch(resetInputErrorCreateAddress());
  // };
  return (
    <div className="min-w-0 min-h-0 col-span-12 grid grid-rows-1">
      <div className="px-7 py-5 text-2xl flex flex-col justify-center row-span-1">
        <p>{text}</p>
        {children}
        {/* <CartModalAddNewAddress onSuccess={handleClickCloseAddNewAddress} /> */}
      </div>
      <AiOutlineClose
        size={40}
        color="gray"
        className="absolute right-1 top-3 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
        // onClick={handleClickCloseAddNewAddress}
        onClick={onClose}
      />
    </div>
  );
}
