import { useState } from "react";
import Modal from "../components/Modal";
import ProductHover from "../features/products/ProductHover";
// import { setHover } from "../stores/productSlice";
// import { useDispatch, useSelector } from "react-redux";
export default function ProductBox({ products }) {
  const [isHover, setIsHover] = useState(false);
  // const {isHover} = useSelector(state=>state.products)
  const [isOpen, setIsOpen] = useState(false);
  // const dispatch = useDispatch();
  const handleOpen = () => {
    // console.log("eiei2");
    setIsOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(() => false);
  };
  // console.log(isHover)
  
  // if(isOpen) {
  //   document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`
  //   document.body.style.overflowY = 'hidden'
  // }else if(!isOpen) {
  //   // document.body.style.paddingRight = '0px'
  //   document.body.style.overflowY = 'auto'
  // }
  let div = document.querySelector("body");
  div.style.overflowY = isOpen ? "hidden" : "auto";
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
                ? products.Images[0].image
                : products.Images[1]?.image
                ? products.Images[1].image
                : products.Images[0].image
            }
            className={`w-full h-52 object-fill `}
          />
          <ProductHover isHover={isHover} />
        </div>
        <p className="text-gray-800 px-2 mt-3">{products.name}</p>
        <p className="text-gray-500 px-2 mb-3">฿ {products.price}</p>
      </div>
      {isOpen && <Modal onClose={handleClose} products={products} />}
    </>
  );
}
