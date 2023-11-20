import { useEffect } from "react";
import DropDownFilterBox from "../../components/DropDownFilterBox";
import { getMaxMinPrice } from "../../stores/productSlice";
import { useDispatch } from "react-redux";
import { CATEGORY } from "../../stores/productSlice";
export default function ProductSideFilter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSizeMaxMin = async () => {
      dispatch(getMaxMinPrice());
    };
    getSizeMaxMin();
  }, []);
  return (
    <>
      <div className="w-10/12 sm:w-6/12 md:gap-0 md:w-3/12 p-0 md:pr-5 mt-2 flex flex-row md:flex-col">
        <DropDownFilterBox category={CATEGORY} />
      </div>
    </>
  );
}
