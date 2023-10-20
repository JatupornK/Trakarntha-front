import { useDispatch, useSelector } from "react-redux";
import { setSlide, filterAll } from "../stores/productSlice";

export default function DropDownFilterItem({ list, type }) {
  const { slide } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { textCategory } = useSelector((state) => state.products);

  return (
    <>
      {type === "list" ? (
        <ul className="mb-5" onClick={(e) => e.stopPropagation()}>
          {list.map((item) => (
            <li
              onClick={(e) => dispatch(filterAll({type:'type', value: e.target.innerHTML}))}
              className={`hover:text-gray-400 ${
                item.title === textCategory ? "text-black font-bold" : ""
              }`}
              key={item.title}
            >
              {item.title}
            </li>
          ))}
        </ul>
      ) : type === "range" ? (
        <div
          className="mb-5 flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            value={slide}
            onChange={(e) => dispatch(setSlide(e.target.value))}
            onMouseUp={(e) => dispatch(filterAll({type:'price',value: e.target.value}))}
            className="bg-transparent flex-1"
            type="range"
            min={list.min}
            max={list.max}
          ></input>
          <div className=" flex-1 flex flex-between">
            <p className="flex-1">฿ {slide}</p>
            <p className="flex-1 text-right">฿ {list.max}</p>
          </div>
        </div>
      ) : (
        <div className="mb-5" onClick={(e) => e.stopPropagation()}>
          {list.map((item, idx) => (
            <div key={idx} className="flex gap-1">
              <input
                className="hover:text-gray-400"
                type="checkbox"
                id={item}
                name={item}
                onClick={(e) => {
                  const payload = {
                    isChecked: e.target.checked,
                    name: e.target.name,
                    type: 'size'
                  };
                  dispatch(filterAll(payload));
                }}
              ></input>
              <label className="flex-1 hover:text-gray-400" htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
