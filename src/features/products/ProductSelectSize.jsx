import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSize } from "../../stores/productSlice";

export default function ProductSelectSize({ sizes }) {
  const { selectedSize } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // console.log(selectedSize)
  useEffect(() => {
    dispatch(setSelectedSize(sizes[0].Size.size));
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <label htmlFor="size" className="text-xl mr-3">
          Size :
        </label>
        <select
          name="size"
          id="size"
          className="w-2/12  border border-1 border-gray-500 text-center "
          value={selectedSize}
          onChange={(e)=>dispatch(setSelectedSize(e.target.value))}
        >
          {sizes.map((item) => {
            return (
              <option
                key={item.sizeId}
                value={item.Size.size}
                className="hover:bg-gray-300"
              >
                {item.Size.size}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
