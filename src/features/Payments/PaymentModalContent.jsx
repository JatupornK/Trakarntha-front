import { AiOutlineClose } from "react-icons/ai";
import PaymentItem from "./PaymentItem";
import * as userApi from '../../apis/user-api'
import { useDispatch, useSelector } from "react-redux";
import { UpdatePaymentsTime, updateSelectedPayment } from "../../stores/userSlice";
import { useEffect } from "react";
export default function PaymentModalContent({ onClose }) {
    const {newSelectedPaymentId} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    console.log(newSelectedPaymentId)
    useEffect(()=>{
        const fetchUpdatePaymentTime = async() => {
            const res = await userApi.getUpdatedPaymentTime();
            if(res.status===201) {
                console.log(res.data.time)
                dispatch(UpdatePaymentsTime(res.data.time))
            }
        }
        fetchUpdatePaymentTime()
    },[])

    const handleSubmit = async(e) => {
        try{
            console.log(newSelectedPaymentId)
            e.preventDefault();
            const res = await userApi.chooseNewPayment(newSelectedPaymentId);
            if(res.status===201) {
                dispatch(updateSelectedPayment(newSelectedPaymentId))
            }
            onClose();
        }catch(err){
            console.log(err.message)
        }
    }
    

  return (
    <>
      <div className="min-w-0 min-h-0 col-span-12">
        <div className="grid grid-flow-row grid-rows-8 h-full">
          <div className="py-4 row-span-1 min-w-0 min-h-0 h-full row-start-1 row-end-2">
            <p className="font-semibold text-xl text-center">My Payments</p>
            <hr className="border-1 border-gray-200 mt-4" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="row-span-7 h-full row-start-2 row-end-9 min-w-0 min-h-0 grid grid-rows-7"
          >
            <PaymentItem />
          </form>
          <AiOutlineClose
            size={40}
            color="gray"
            className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
            onClick={onClose}
          />
        </div>
      </div>
    </>
  );
}
