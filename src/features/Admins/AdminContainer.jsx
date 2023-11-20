import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminCreateProduct from "./AdminCreateProduct";
import AdminOrderDashboard from "./AdminOrderDashboard";
import { useDispatch, useSelector } from "react-redux";
import { resetCreateProductForm, setCreateProductInput } from "../../stores/adminSlice";
import { fetchProductSize, fetchProductType } from "../../stores/productSlice";
import * as productApi from "../../apis/product-api";

export default function AdminContainer() {
  const [features, setFeatures] = useState(false);
  const {productType} = useSelector(state=>state.products)
  const dispatch = useDispatch();
  console.log(productType)
  useEffect(()=>{
    dispatch(resetCreateProductForm());
    const fetchProductInfo = async () => {
      try {
        const [type, size] = await Promise.all([
          productApi.getProductType(),
          productApi.getProductSize(),
        ]);
        dispatch(fetchProductSize(size.data.size));
        dispatch(fetchProductType(type.data.type));
        dispatch(setCreateProductInput({ type: type.data.type[0] }));
      } catch (err) {
        console.log("Can not get product size and type");
      }
    };
    fetchProductInfo();

  },[])
  return (
    <div className="flex justify-center">
      <div className="container w-full 2xl:w-5/12 xl:w-5/12 lg:w-3/6 md:w-4/5 sm:w-4/5">
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
