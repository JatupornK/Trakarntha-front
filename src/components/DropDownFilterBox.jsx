import DropDownFilterItem from "./DropDownFilterItem";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setFilterClick } from "../stores/productSlice";

export default function DropDownFilterBox({ category }) {
  const { filter } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <>
      {category.map((item, idx) => (
        <div
          className={`relative cursor-pointer flex-1 md:flex-grow-0 w-full`}
          key={item.title}
          onClick={() => {
            dispatch(setFilterClick(idx));
          }}
        >
          <hr className="border-1 border-gray-200" />
          <div className={`flex flex-row p-2 md:py-5 items-center border ${idx===1 && 'border-x-0'} border-black md:border-none`}>
            <div className="flex-1 text-xs sm:text-base">{item.title}</div>
            {!filter[idx] ? (
              <AiOutlinePlus className="md:w-5 md:h-5 sm:w-4 sm:h-4 w-3 h-3" />
            ) : (
              <AiOutlineMinus className="md:w-5 md:h-5 sm:w-4 sm:h-4 w-3 h-3"/>
            )}
          </div>
          <div className="w-full">

          {filter[idx] && (
            <DropDownFilterItem
            key={item.title}
            list={item.type}
            type={item.box}
            />
            )}
            </div>
        </div>
      ))}
      <hr className="border-1 border-gray-200" />
    </>
  );
}
