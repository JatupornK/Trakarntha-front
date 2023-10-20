import { useDispatch } from "react-redux";
import { sortAll } from "../stores/productSlice";
export default function DropDownSortList({ item, text }) {
  const dispatch = useDispatch();
  // console.log(item.func)
  return (
    <li
      className={`hover:bg-gray-100 p-2 leading-4 ${
        item.title === text && "bg-gray-200"
      }`}
      onClick={()=>dispatch(sortAll({type: item.title}))}
    >
      {item.title}
    </li>
  );
}
