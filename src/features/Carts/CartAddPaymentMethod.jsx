import { useState } from "react";
import Modal from "../../components/Modal";
import PaymentForm from "../Payments/PaymentForm";

export default function CartAddPaymentMethod() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center items-end gap-1">
      <div className="text-blue-500 underline-offset-2 underline cursor-pointer hover:text-blue-300" onClick={()=>setIsOpen(true)}>
        Add new payment 
      </div>
      {isOpen && <Modal style={{ width: "500px" }}><PaymentForm onClose={()=>setIsOpen(false)} /></Modal>}
    </div>
  );
}
