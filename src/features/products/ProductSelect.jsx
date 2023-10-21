import ProductSelectQuantity from "./ProductSelectQuantity";
import ProductSelectSize from "./ProductSelectSize";
import ProductSubmitForm from "./ProductSubmitForm";
import * as userApi from "../../apis/user-api";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../stores/userSlice";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utills/localStorage";
import { toast } from "react-toastify";
export default function ProductSelect({ product, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = async (e) => {
    try {
      if(!getAccessToken()){
        onClose();
        navigate('/login')
        toast.error('Please login before continue.')
        return
      } 
      e.preventDefault();
      let size = e.target.size?.value || "FREESIZE";
      let input = {
        size,
        productId: product.id,
        productPrice: product.price,
        amount: e.target.quantity.value,
      };
      const res = await userApi.addProductToCart(input);
      // console.log(res)
      if (res.status === 201) {
        onClose();
        dispatch(updateCartData(res.data.product));
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="flex flex-col mt-4" onSubmit={handleAddToCart}>
      {product.ProductSizes[0]?.Size.size && (
        <ProductSelectSize sizes={product.ProductSizes} />
      )}
      <ProductSelectQuantity />
      <ProductSubmitForm />
    </form>
  );
}
