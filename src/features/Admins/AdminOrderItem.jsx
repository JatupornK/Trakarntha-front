import { useEffect, useState } from "react";
import AdminOrderItemProduct from "./AdminOrderItemProduct";
import AdminUpdateOrderStatus from "./AdminUpdateOrderStatus";
import { orderStatus } from "../../stores/adminSlice";

export default function AdminOrderItem({ order }) {
  const [isExclusiveMember, setIsExclusiveMember] = useState(false);
  const [isClick, setIsClick] = useState(false);
  console.log(order)
  const sumOrderPrice = order.reduce((acc, el) => {
    return acc + el.Cart.sumPrice;
  }, 0);
  useEffect(() => {
    if (order[0].Order.orderPrice != sumOrderPrice) {
      setIsExclusiveMember(true);
    }
  }, []);

  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = isClick ? "hidden" : "unset";
  }, [isClick]);

  return (
    <div className="my-5">
      <h1 className="text-2xl text-center font-semibold">
        Order ID : {order[0].orderId}
      </h1>
      <div className="text-sm mt-4">
        <div className="flex flex-row gap-x-5 flex-wrap">
          <h2>
            <span className="font-semibold">Order Time</span> :{" "}
            {order[0].Order.createdAt.slice(0, 10)}
          </h2>
          <h2>
            <span className="font-semibold">Order Status</span> :{" "}
            {order[0].Order.orderStatus}
          </h2>
          <h2>
            <span className="font-semibold">Payment</span> :{" "}
            {order[0].Order.UserPayment.Payment.payment}-
            {order[0].Order.paymentStatus}{" "}
          </h2>

          <h2>
            <span className="font-semibold">Customer</span> :{" "}
            {order[0].Order.User.firstName} {order[0].Order.User.lastName}
          </h2>
          <h2>
            <span className="font-semibold">To</span> :{" "}
            {order[0].Order.Address.firstName} {order[0].Order.Address.lastName}
          </h2>
          <h2>
            <span className="font-semibold">Tel</span> :{" "}
            {order[0].Order.Address.phoneNumber}
          </h2>
          <h2>
            <span className="font-semibold">Address</span> :{" "}
            {order[0].Order.Address.address} {order[0].Order.Address.postCode}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h3 className="mt-1">
            <span className="font-semibold">Product</span> :{" "}
          </h3>
          {order.map((item) => (
            <AdminOrderItemProduct key={item.id} product={item} />
          ))}
        </div>
        <div className="mt-1">
          {isExclusiveMember && (
            <>
              <h3>
                <span className="font-semibold">Sum price</span> :{" "}
                {sumOrderPrice.toLocaleString()}
              </h3>
              <h3 className="font-semibold">Exclusive member discount 10%</h3>
            </>
          )}
          <span className="font-semibold">Total Price</span> :{" "}
          {!isExclusiveMember
            ? sumOrderPrice.toLocaleString()
            : sumOrderPrice.toLocaleString() +
              " - " +
              (sumOrderPrice * 0.1).toLocaleString() +
              " = " +
              (sumOrderPrice * 0.9).toLocaleString()}{" "}
          ฿
        </div>
      </div>
      <div className="w-full flex justify-center">
        {orderStatus[orderStatus.length - 1] !== order[0].Order.orderStatus && (
          <AdminUpdateOrderStatus onOpen={()=>setIsClick(true)} onClose={() => setIsClick(false)} isClick={isClick} orderStatus={order[0].Order.orderStatus} orderId={order[0].Order.id} />
        )}
      </div>
    </div>
  );
}
