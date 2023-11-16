import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminCreateProduct from "./AdminCreateProduct";
import AdminOrderDashboard from "./AdminOrderDashboard";
import { useDispatch, useSelector } from "react-redux";
import { resetCreateProductForm, setCreateProductInput } from "../../stores/adminSlice";

export default function AdminContainer() {
  const [features, setFeatures] = useState(false);
  const {productType} = useSelector(state=>state.products)
  const dispatch = useDispatch();
  console.log(productType)
  useEffect(()=>{
    dispatch(resetCreateProductForm());
    dispatch(setCreateProductInput({type:productType[0]}))
  },[])
  return (
    <div className="flex justify-center">
      <div className="container w-full 2xl:w-4/12 xl:w-5/12 lg:w-3/6 md:w-3/5 sm:w-4/5">
        <h1 className="font-bold text-center text-4xl mb-4 mt-8">
          Admin Management
        </h1>
        <AdminHeader
          feature={features}
          chooseNew={() => setFeatures(!features)}
        />
        {features === false ? <AdminCreateProduct /> : <AdminOrderDashboard />}
      </div>
    </div>
  );
}
