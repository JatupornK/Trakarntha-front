import ProductSelectQuantity from "./ProductSelectQuantity";
import ProductSelectSize from "./ProductSelectSize";
import ProductSubmitForm from "./ProductSubmitForm";
import * as userApi from "../../apis/user-api";
import { useDispatch } from "react-redux";
import { setBuyNow, updateCartData } from "../../stores/userSlice";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utills/localStorage";
import { toast } from "react-toastify";
import { useState } from "react";
export default function ProductSelect({ product, onClose }) {
  const dispatch = useDispatch();
  const [button, setButton] = useState("button1");
  const navigate = useNavigate();
  const handleAddToCart = async (e) => {
    console.log(e.target)
    let size = e.target.size?.value || "FREESIZE";
    let input = {
      size,
      productId: product.id,
      productPrice: product.price,
      amount: e.target.quantity.value,
    };
    if (!getAccessToken()) {
      onClose();
      navigate("/login");
      toast.error("Please login before continue.");
      return;
    }
    if (button === "button1") {
      try {
        e.preventDefault();
        const res = await userApi.addProductToCart(input);
        console.log(res)
        if (res.status === 201) {
          onClose();
          // console.log(res)
          dispatch(updateCartData(res.data.addedProduct[0]));
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else if (button === "button2") {
      e.preventDefault();
      onClose()
      dispatch(setBuyNow(input))
      // dispatch(updateCartData(input))
      navigate("/cart");
    }
  };

  return (
    <form className="flex flex-col mt-4" onSubmit={handleAddToCart}>
      {product.ProductSizes[0]?.Size.size && (
        <ProductSelectSize sizes={product.ProductSizes} />
      )}
      <ProductSelectQuantity />
      <ProductSubmitForm
        onClick1={() => setButton("button1")}
        onClick2={() => setButton("button2")}
      />
    </form>
  );
}
