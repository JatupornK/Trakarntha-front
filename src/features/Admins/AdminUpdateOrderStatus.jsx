import Modal from "../../components/Modal";
import AdminModalConfirmUpdate from "./AdminModalConfirmUpdate";

export default function AdminUpdateOrderStatus({ orderStatus, orderId, isClick, onClose, onOpen }) {

  return (
    <>
      <button
        onClick={onOpen}
        className="p-2 rounded-md bg-red-500 text-white mt-2"
      >
        Update order status
      </button>
      {isClick && (
        <Modal style={{ width: "380px", height: "180px" }}>
          <AdminModalConfirmUpdate
            oldStatus={orderStatus}
            orderId={orderId}
            onClose={onClose}
          />
        </Modal>
      )}
    </>
  );
}
