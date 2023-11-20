import { useEffect, useRef, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import DropDownSort from "../../components/DropDownSort";
// import useProduct from "../../hooks/useProduct";
import {
  setSortClick,
  setSortClose,
  sortList,
} from "../../stores/productSlice";
import { useDispatch, useSelector } from "react-redux";
export default function ProductSort() {
  const { sort, textSort } = useSelector((state) => state.products);
  // console.log(sort, text)
  const dispatch = useDispatch();
  // const handleClick = () => {
  //   setSort(!sort);
  // };
  const ref = useRef();
  //  console.log(setSortClick, setSortClose)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current.contains(e.target)) {
        dispatch(setSortClose());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center md:items-end">
        <div className="flex mt-2 flex-col w-full sm:w-5/12 md:w-4/12 lg:w-3/12 cursor-pointer " ref={ref}>
          <div
            className="border border-black p-2 leading-5 flex justify-between items-center text-center"
            onClick={() => dispatch(setSortClick())}
          >
            <p className="flex-1 sm:text-base text-xs">{textSort}</p>
            {!sort ? <AiOutlineDown className="md:w-5 md:h-5 sm:w-4 sm:h-4 w-3 h-3"  /> : <AiOutlineUp className="md:w-5 md:h-5 sm:w-4 sm:h-4 w-3 h-3"  />}
          </div>
          {sort && (
            <div className="relative text-center ">
              <div className="z-10 absolute w-full border border-t-0 border-gray-400 shadow-sm shadow-gray-200 bg-white">
                <DropDownSort list={sortList} text={textSort} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
