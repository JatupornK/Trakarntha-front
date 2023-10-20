import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
export default function ProductSelectQuantity() {
  const [count, setCount] = useState(1);
  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };
  return (
    <>
      <div className="flex flex-row mt-4">
        <label htmlFor="quantity" className="text-xl mr-3">
          Quantity :
        </label>
        <div className="flex items-center border border-gray-400 w-fit">
          <AiOutlineMinus
            color={`${count === 1 ? "BDB7B7" : ""}`}
            onClick={handleDecrease}
            size={29.6}
            className="border-r border-gray-400 p-1"
          />
          <input
            className="bg-transparent w-10 text-center text-lg"
            name="quantity"
            disabled
            value={count}
          ></input>
          <AiOutlinePlus
            onClick={() => setCount(count + 1)}
            size={29.6}
            className=" border-l border-gray-400 p-1 "
          />
        </div>
      </div>
    </>
  );
}
