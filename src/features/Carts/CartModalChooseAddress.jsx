import { AiOutlineClose } from "react-icons/ai";
import CartAddressItem from "./CartAddressItem";
import { updateSelectedAddress } from "../../stores/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as userApi from '../../apis/user-api';
export default function CartModalChooseAddress({ onClose, address, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const {newSelectedAddressId} = useSelector(state=>state.user)
  console.log(newSelectedAddressId)
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      onClose();
      const res = await userApi.chooseNewAddress(newSelectedAddressId);
      if(res.status===201) {
        dispatch(updateSelectedAddress(newSelectedAddressId));
      }
    } catch (err) {
      console.log(err)
      alert(err.message);
    }
  };
  return (
    <div className="min-w-0 min-h-0 col-span-12">
      <div className="grid grid-flow-row grid-rows-8 h-full">
        <div className="py-4 row-span-1 min-w-0 min-h-0 h-full row-start-1 row-end-2">
          <p className="font-semibold text-xl text-center">My Address</p>
          <hr className="border-1 border-gray-200 mt-4" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="row-span-7 h-full row-start-2 row-end-9 min-w-0 min-h-0 grid grid-rows-7"
        >
          <CartAddressItem address={address} onEdit={onEdit} onDelete={onDelete} />
        </form>
        <AiOutlineClose
          size={40}
          color="gray"
          className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
