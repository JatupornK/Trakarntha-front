import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import PaymentModalContent from "./PaymentModalContent";

export default function PaymentChangePayment() {
  const [open, setOpen] = useState(false);
  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = open ? "hidden" : "unset";
  }, [open]);

  const handleOnclose = () => {
    div.style.overflowY = "unset";
    setOpen(false);
  };
  return (
    <>
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <p className="text-blue-500 underline underline-offset-2 hover:text-blue-300">
          Change Payment
        </p>
      </div>
      {open && (
        <Modal width={"500px"} style={{ width: "500px" }}>
          <PaymentModalContent onClose={handleOnclose} />
        </Modal>
      )}
    </>
  );
}
