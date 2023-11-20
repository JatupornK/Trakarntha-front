import { useDispatch, useSelector } from "react-redux";
import { setCreateProductInput } from "../../stores/adminSlice";
// import { useEffect } from "react";

export default function AdminSelectProductType({ type }) {
    const dispatch = useDispatch();
    const {createProductInput} = useSelector(state=>state.admin);
    console.log(type)
    // useEffect(()=>{
    //     dispatch(setCreateProductInput({type:type[0]}))
    // },[])
  return (
    <>
      <div className="text-base mt-5 flex flex-row gap-2 items-center">
        <div>Type :</div>
        <select value={createProductInput.type} onChange={(e)=>dispatch(setCreateProductInput({type:e.target.value}))} className="border border-1 border-gray-300 text-center cursor-pointer">
          {type.map((item, idx) => {
            return <option key={idx}>{item}</option>;
          })}
        </select>
      </div>
    </>
  );
}
