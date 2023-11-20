import { orderStatus, sortOrder, updateOrderStatus } from "../../stores/adminSlice";
import * as adminApi from '../../apis/admin-api';
import { useDispatch } from "react-redux";
export default function AdminModalConfirmUpdate({ onClose, oldStatus, orderId }) {
  const index = orderStatus.findIndex((item) => item === oldStatus);
  const newStatus = orderStatus[index + 1];
  const dispatch = useDispatch();
  
 const handleClickUpdateStatus = async() => {
    try{
        const res = await adminApi.updateOrderStatus({status:newStatus, id:orderId })
        if(res.status===201){
            onClose();
            dispatch(updateOrderStatus({status:newStatus, id:orderId}))
            dispatch(sortOrder());
        }
    }catch(err) {
        console.log(err);
    }
 }
  return (
    <div className="col-span-12 h-full">
      <div className="flex text-center pb-6 gap-4 h-full items-center flex-col justify-center">
        <div className="py-5 px-4">
          <h1>
            Do you want to update order status from{" "}
            <span className="font-semibold">{oldStatus}</span> to{" "}
            <span className="font-semibold">{newStatus}</span>?
          </h1>
        </div>
        <div className="w-4/6">
          <div className="flex justify-between">
            <button
              className="w-20 border border-gray-200  px-2 py-1 hover:bg-gray-200 bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="w-20 bg-red-400 hover:bg-red-300 border border-gray-200  px-2 py-1" onClick={handleClickUpdateStatus}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
