// import { AiOutlineClose } from "react-icons/ai";
// import ProductSelect from "../features/products/ProductSelect";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setBuyNow } from "../stores/userSlice";
// import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

import React from "react";

// import React, { useState } from "react";

// export default function Modal({ onClose, product, children }) {
export default function Modal({ children, width, style, isSecondOpen }) {
  // const [imageShow, setImageShow] = useState(0);
  // const dispatch = useDispatch()
  // const handleChangeImageShow = () => {
  //   // if (status === "right") {
  //   if (imageShow + 1 > product.Images.length - 1) {
  //     return setImageShow(0);
  //   } else if (imageShow - 1 < 0) {
  //     return setImageShow(product.Images.length - 1);
  //   } else {
  //     return setImageShow(imageShow + 1);
  //   }
  // };
  // useEffect(()=>{
  //   dispatch(setBuyNow({}))
  // },[])
  // console.log(product);
  // const [firstModal, setFirstModal] = useState(true);
  // const [secondModal, setSecondModal] = useState(false);
  const childrenArray = React.Children.toArray(children);
  console.log(childrenArray);
  return (
    <>
      <div className="fixed left-0 top-0 h-full w-full z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-600 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="relative w-screen h-screen">
            <div
              style={style}
              className={`bg-white container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${width} h-4/6 opacity-100 grid grid-flow-col grid-cols-12`}
            >
              {childrenArray[0]}
              {/* {firstModal && childrenArray[0]} */}
              {/* <button onClick={()=>setSecondModal(true)}>asdf</button> */}
              {/* <div
                className="p-4 pb-8 col-span-7 min-h-0 min-w-0 w-full h-full relative"
                onClick={handleChangeImageShow}
              >
                <div className=" absolute text-center text-xs bottom-0 w-full -ml-4 mb-2">
                  Click the image to see another pictures.
                </div>
                <img
                  src={product.Images[imageShow].image}
                  className={`object-fill cursor-pointer block h-full w-full`}
                  onClick={handleChangeImageShow}
                />
              </div>
              <div className="relative col-span-5 py-5 break-normal pr-10 whitespace-normal h-full min-w-0 min-h-0">
                <div className="text-4xl font-bold">{product.name}</div>
                <div className="mt-3 text-lg max-h-36 text-ellipsis overflow-hidden ">
                  {product.description}
                </div>
                <h3 className="mt-3 text-2xl">฿ {product.price.toLocaleString()}</h3>
                <ProductSelect
                  product={product}
                  onClose={onClose}
                />
                <div className="flex w-full justify-center mt-2">
                  <a
                    className="hover:text-gray-500 underline underline-offset-2"
                    href="/"
                  >
                    View more details
                  </a>
                </div>
                <AiOutlineClose
                  size={45}
                  color="gray"
                  className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
                  onClick={onClose}
                />
              </div> */}
            </div>
            {isSecondOpen && <div
              style={style}
              className={`bg-white container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${width} h-4/6 opacity-100 grid grid-flow-col grid-cols-12`}
            >
              {childrenArray[1]}
            </div>}
            {/* {secondModal && <div className="z-10 bg-white container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${width} h-4/6 opacity-100 grid grid-flow-col grid-cols-12">
            {childrenArray[1]}
            </div>} */}
          </div>
        </div>
      </div>
    </>
  );
}
