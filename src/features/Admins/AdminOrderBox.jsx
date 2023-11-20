import AdminOrderItem from "./AdminOrderItem";

export default function AdminOrderBox({orders}) {
  return (
    <div className="w-full flex flex-col">
      {orders.map((item,idx) => (
        <div key={idx}>
            <hr className="w-full border-gray border-1 mt-2"/>
            <AdminOrderItem order={item}/>
            {orders.length-1===idx && <hr className="w-full border-gray border-1 mt-2 my-5"/>}
        </div>
      ))}
    </div>
  );
}
