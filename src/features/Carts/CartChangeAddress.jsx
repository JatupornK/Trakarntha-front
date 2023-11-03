import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import CartModalChooseAddress from "./CartModalChooseAddress";

export default function CartChangeAddress({ address }) {
  const [isOpen, setIsOpen] = useState(false); //choose new one
  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleOnclose = () => {
    div.style.overflowY = "unset";
    setIsOpen(false);
  };
  
  return (
    <>
      <div className="flex justify-center items-center gap-1">
        <div
          onClick={() => setIsOpen(true)}
          className="text-blue-500 underline-offset-2 underline cursor-pointer hover:text-blue-300"
        >
          Change Address
        </div>
      </div>
      {isOpen && (
        <Modal style={{ width: "500px" }}>
          <CartModalChooseAddress
            onClose={handleOnclose}
            address={address}
          />
        </Modal>
      )}
    </>
  );
}
