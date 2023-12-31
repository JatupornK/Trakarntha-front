import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utills/localStorage";

export default function RedirerctIfNotAdmin({ children }) {
  const { userProfile } = useSelector((state) => state.user);

  if (getAccessToken()) {
    // ถ้าไม่เช็คจาก token จะ error ตอนโหลดหน้า admin จะโดน redirect to all-product เพราะ fetch data ใหม่ทุกรอบที่กด refresh
    console.log(userProfile);
    // if loading
    if (userProfile?.role !== "admin") {
      return <Navigate to={"/all-products"} />;
    }
  }
  return children;
}
