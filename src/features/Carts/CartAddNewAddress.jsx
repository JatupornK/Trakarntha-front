import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import CartModalContent from "./CartModalContent";
import CartModalAddNewAddress from "./CartModalAddNewAddress";
import { useDispatch } from "react-redux";
import { resetInputErrorCreateAddress } from "../../stores/userSlice";
export default function CartAddNewAddress() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = open ? "hidden" : "unset";
  }, [open]);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClickCloseAddNewAddress = () => {
    div.style.overflowY = "unset";
    setOpen(false);
    dispatch(resetInputErrorCreateAddress());
  };
  return (
    <>
      <div className="flex justify-center items-end gap-1">
        <div
          className="text-blue-500 underline-offset-2 underline cursor-pointer hover:text-blue-300"
          onClick={handleClick}
        >
          Add new address
        </div>
      </div>
      {open && (
        <Modal style={{ width: "500px" }}>
          {/* <CartModalContent onClose={handleClose}> */}
          <CartModalContent text={'New Address'} onClose={handleClickCloseAddNewAddress}>
            <CartModalAddNewAddress onSuccess={handleClickCloseAddNewAddress} />
          </CartModalContent>
        </Modal>
      )}
    </>
  );
}
