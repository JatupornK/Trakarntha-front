import { useState } from "react";
import Modal from "../components/Modal";
import ProductHover from "../features/products/ProductHover";
import { resetSelected } from "../stores/productSlice";
// import { setHover } from "../stores/productSlice";
import { useDispatch} from "react-redux";
export default function ProductBox({ product }) {
  const [isHover, setIsHover] = useState(false);
  // const {isHover} = useSelector(state=>state.products)
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    // console.log("eiei2");
    setIsOpen(true);
  };
  let div = document.querySelector("body");
  div.style.overflowY = isOpen ? "hidden" : "unset";
  const handleClose = (e) => {
    // e.stopPropagation();
    div.style.overflowY = 'unset' // in-case redirect when click (add to cart, buy now, add favourite) not authenticated
    console.log('eiei')
    dispatch(resetSelected())
    setIsOpen(false);
  };
  // console.log(product)
  return (
    <>
      <div
        className={`text-center w-full mt-6 cursor-pointer`}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={handleOpen}
      >
        <div className="relative">
          <img
            src={
              !isHover
                ? product.Images[0].image
                : product.Images[1]?.image
                ? product.Images[1].image
                : product.Images[0].image
            }
            className={`w-full h-52 object-fill `}
          />
          <ProductHover isHover={isHover} />
        </div>
        <p className="text-gray-800 px-2 mt-3">{product.name}</p>
        <p className="text-gray-500 px-2 mb-3">฿ {product.price}</p>
      </div>
      {isOpen && <Modal onClose={handleClose} product={product} />}
    </>
  );
}
