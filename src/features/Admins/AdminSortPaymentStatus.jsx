import { useEffect, useRef, useState } from "react";
import { paymentStatus, sortOrder } from "../../stores/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export default function AdminSortPaymentStatus () {
    const [isSort, setIsSort] = useState(false);
    const ref = useRef();
    const { sortPaymentStatus } = useSelector((state) => state.admin);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
          setIsSort(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleClickSort = (item) => {
      dispatch(sortOrder({type:'payment',sort: item}));
      setIsSort(false);
    };
  
    return (
      <>
        <div className="text-center pt-4 pb-2" ref={ref}>
          <div
            onClick={() => setIsSort(!isSort)}
            className="w-40 border border-black cursor-pointer flex flex-row justify-between items-center p-1"
          >
            <p className="flex-1">
              {sortPaymentStatus === "All" ? "Payment status" : sortPaymentStatus}
            </p>
            {isSort ? <AiOutlineUp className="mr-1"/> : <AiOutlineDown className="mr-1"/>}
          </div>
          {isSort && (
            <div className="relative">
              <div className="z-10 cursor-pointer absolute w-full border border-t-0 border-gray-400 bg-white">
                <ul>
                  {paymentStatus.map((item, idx) => (
                    <li
                      onClick={() => handleClickSort(item)}
                      className={`hover:bg-gray-100 p-1 leading-5 ${
                        sortPaymentStatus === item && "bg-gray-200"
                      }`}
                      key={idx}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    );
}