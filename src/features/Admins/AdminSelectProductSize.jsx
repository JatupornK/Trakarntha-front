import { useDispatch, useSelector } from "react-redux";
import { setCreateProductInput } from "../../stores/adminSlice";

export default function AdminSelectProductSize({ size }) {
  const dispatch = useDispatch();
  const { createProductInput } = useSelector((state) => state.admin);
  // console.log(createProductInput)
  // console.log(createProductInput.productImageMain)
  
  if (createProductInput.type === "RING") {
    size = size.filter((item) => +item <= 7);
  }
  if (createProductInput.type === "BRACELET") {
    size = size.filter((item) => +item > 12 && +item < 18);
  }
  if (
    createProductInput.type === "NECKLACE" ||
    createProductInput.type === "EARRING"
  ) {
    size = size.filter((item) => item === "FREESIZE");
  }
  return (
    <>
      <div className="mt-5 flex flex-row gap-2 ">
        <div>Size : </div>
        <div className="flex flex-row gap-3">
          {size.map((item, idx) => {
            return (<div key={idx} className="flex flex-row items-center">
              <input
                name={item}
                type="checkbox"
                className="mr-0.5"
                checked={createProductInput.size.includes(item)? true : false}
                onChange={(e) =>
                  dispatch(
                    setCreateProductInput({
                      size:{
                        isChecked: e.target.checked,
                        name: e.target.name,
                      }
                    })
                  )
                }
              />
              <label>{item}</label>
            </div>);
          })}
        </div>
      </div>
    </>
  );
}
