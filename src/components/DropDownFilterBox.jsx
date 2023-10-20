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
          className="text-gray-500 cursor-pointer"
          key={item.title}
          onClick={() => {
            dispatch(setFilterClick(idx));
          }}
        >
          <hr className="border-1 border-gray-200" />
          <div className="flex flex-row py-5 items-center">
            <div className="flex-1">{item.title}</div>
            {!filter[idx] ? (
              <AiOutlinePlus size={20} />
            ) : (
              <AiOutlineMinus size={20} />
            )}
          </div>
          {filter[idx] && (
            <DropDownFilterItem
              key={item.title}
              list={item.type}
              type={item.box}
            />
          )}
        </div>
      ))}
      <hr className="border-1 border-gray-200" />
    </>
  );
}
