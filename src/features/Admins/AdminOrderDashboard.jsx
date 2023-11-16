import { useEffect } from "react";
import * as adminApi from "../../apis/admin-api";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../stores/adminSlice";
import AdminSortOrderStatus from "./AdminSortOrderStatus";
import AdminSortPaymentStatus from "./AdminSortPaymentStatus";
import AdminOrderBox from "./AdminOrderBox";

export default function AdminOrderDashboard() {
  const { orders } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await adminApi.fetchAllOrder();
        const order = res.data.orders.reduce((acc, el) => {
          if (acc.length === 0) {
            acc.push([el]);
          } else {
            const isSameOrder = acc.findIndex(
              (item) => item[0].orderId === el.orderId
            );
            if (isSameOrder !== -1) {
              acc[isSameOrder].push(el);
            } else {
              acc.push([el]);
            }
          }
          return acc;
        }, []);
        dispatch(setOrder(order));
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);

  console.log(orders);
  return (
    <div className="container w-full">
      <div className="w-full flex flex-row justify-between">
        <AdminSortOrderStatus />
        <AdminSortPaymentStatus />
      </div>
      {orders.length>0&&<AdminOrderBox orders={orders}/>}
    </div>
  );
}
