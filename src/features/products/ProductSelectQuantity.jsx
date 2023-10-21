import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../../stores/productSlice";
import "../../App.css";
export default function ProductSelectQuantity() {
  const { quantity } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // let inp = document.querySelector("input");
  // inp.removeClass('static')
  // console.log(quantity)
  return (
    <>
      <div className="flex flex-row mt-4">
        <label htmlFor="quantity" className="text-xl mr-3">
          Quantity :
        </label>
        <div className="flex items-center border border-gray-400 w-fit">
          <AiOutlineMinus
            color={`${quantity === 1 ? "BDB7B7" : ""}`}
            onClick={() => dispatch(decreaseQuantity())}
            size={29.6}
            className="border-r border-gray-400 p-1 hover:bg-gray-200"
          />
          <input
            className="bg-transparent w-10 text-center text-lg static"
            name="quantity"
            id="quantity"
            disabled
            value={quantity}
          ></input>
          <AiOutlinePlus
            onClick={() => dispatch(increaseQuantity())}
            size={29.6}
            className=" border-l border-gray-400 p-1 hover:bg-gray-200"
          />
        </div>
      </div>
    </>
  );
}
