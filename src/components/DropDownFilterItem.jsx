import { useDispatch, useSelector } from "react-redux";
import { setSlide, filterAll } from "../stores/productSlice";

export default function DropDownFilterItem({ list, type }) {
  const { slide, textCategory, size } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <>
      {type === "list" ? (
        <ul className="mb-5 absolute z-10 bg-white md:relative w-full md:px-2 border border-t-0 border-black md:border-none" onClick={(e) => e.stopPropagation()}>
          {list.map((item) => (
            <li
              onClick={(e) =>
                dispatch(filterAll({ type: "type", value: e.target.innerHTML }))
              }
              className={`hover:text-gray-400 text-xs sm:text-base p-1 md:p-0 ${
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
          className="mb-5 px-1 absolute z-10 py-2 md:px-2 border-t-0 md:mt-0 bg-white flex flex-col md:static w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {list && (
            <>
              <input
                value={slide}
                onChange={(e) => dispatch(setSlide(e.target.value))}
                onMouseUp={(e) =>
                  dispatch(filterAll({ type: "price", value: e.target.value }))
                }
                className="bg-transparent flex-1"
                type="range"
                min={list.min}
                max={list.max}
              ></input>
              <div className=" flex-1 flex flex-between">
                <p className="flex-1 sm:text-base text-xs">฿ {slide}</p>
                <p className="flex-1 text-right sm:text-base text-xs">฿ {list.max}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="p-1 mb-5 absolute md:px-2 z-10 w-full md:static bg-white border border-t-0 border-black md:border-none" onClick={(e) => e.stopPropagation()}>
          {list &&
            list.map((item, idx) => (
              <div key={idx} className="flex gap-1">
                <input
                  className="hover:text-gray-400"
                  type="checkbox"
                  id={item}
                  name={item}
                  checked={size.includes(item) ? true : false}
                  onChange={(e) => {
                    const payload = {
                      isChecked: e.target.checked,
                      name: e.target.name,
                      type: "size",
                    };
                    dispatch(filterAll(payload));
                  }}
                ></input>
                <label className="flex-1 hover:text-gray-400 sm:text-base text-xs" htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
