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
      <div className="w-3/12 pr-5 mt-2">
        <DropDownFilterBox category={CATEGORY} />
      </div>
    </>
  );
}
