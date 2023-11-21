import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ProductHover from "../features/products/ProductHover";
import { resetSelected, updateProductStatus } from "../stores/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductModalContent from "../features/products/ProductModalContent";
import { setBuyNow } from "../stores/userSlice";
import * as adminApi from '../apis/admin-api';
export default function ProductBox({ product }) {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [imageShow, setImageShow] = useState(0);
  const { userProfile } = useSelector((state) => state.user);
  const handleChangeImageShow = () => {
    if (imageShow + 1 > product.Images.length - 1) {
      return setImageShow(0);
    } else {
      return setImageShow(imageShow + 1);
    }
  };
  useEffect(() => {
    dispatch(setBuyNow({}));
  }, []);
  const handleOpen = () => {
    // console.log("eiei2");
    setIsOpen(true);
  };
  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = isOpen ? "hidden" : "unset";
  }, [isOpen]);
  const handleClose = () => {
    div.style.overflowY = "unset"; // in-case redirect when click (add to cart, buy now, add favourite) not authenticated
    dispatch(resetSelected());
    setIsOpen(false);
  };
  const handleClick = async(e) => {
    try{
      const res = await adminApi.updateProductStatus({status:e.target.innerHTML,id:product.id})
      if(res.status===201){
        dispatch(updateProductStatus({id:product.id}))
      }
    }catch(err){
      console.log(err.message);
    }
  };
  return (
    <>
      <div
        className={`text-center w-full mt-6`}
      >
        <div className="relative cursor-pointer">
          <img
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            onClick={handleOpen}
            src={
              !isHover
                ? product.Images[0]?.image
                : product.Images[1]?.image
                ? product.Images[1]?.image
                : product.Images[0]?.image
            }
            className={`w-full h-52 object-fill `}
          />
          <ProductHover isHover={isHover} />
        </div>
        <p className="text-gray-800 px-2 mt-3">{product.name}</p>
        <p className="text-gray-500 px-2 mb-3">
          ฿ {product.price.toLocaleString()}
        </p>
        {userProfile?.role === "admin" && (
          <button
            onClick={handleClick}
            className={`w-full cursor-pointer ${
              !product.isDisabled ? "bg-red-400" : "bg-green-500"
            }`}
          >
            {product.isDisabled ? "Enable" : "Disable"}
          </button>
        )}
      </div>
      {isOpen && (
        <Modal width={"2xl:w-4/6 xl:w-4/5"}>
          <ProductModalContent
            imageShow={imageShow}
            onClose={handleClose}
            product={product}
            handleChangeImageShow={handleChangeImageShow}
          />
        </Modal>
      )}
    </>
  );
}
