import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectNewAddress } from "../../stores/userSlice";
// import CartAddNewAddress from "./CartAddNewAddress";
export default function CartAddressItem({ address }) {
  const dispatch = useDispatch();
  console.log(address)
  const addressLastest = address.filter((item) => item.lastest === true);
  address = address.filter((item) => item.lastest !== true);
  useEffect(() => {
    let lastest = document.getElementById(`${addressLastest[0].id}`);
    lastest.checked = true;
  }, []);
  
  const compareFn = (a,b) => {
    return a.updatedAt < b.updatedAt ? 1:-1
  }
  console.log(addressLastest, address)
  return (
    <>
      <div className="row-span-6 overflow-y-auto">
        <div className="flex flex-row my-2 items-center gap-2 px-4">
          <input
            type="radio"
            id={addressLastest[0].id}
            name="address"
            className="w-5 h-5 checked:accent-red-500 cursor-pointer"
            autoComplete="off"
            onChange={(e)=>dispatch(selectNewAddress({id:+e.target.id}))}
          />
          <div className="w-full word-normal">
            <div className="flex flex-row">
              <p className="font-semibold text-base">
                {addressLastest[0].addressTitle}
              </p>
            </div>
            <p className="">
              {addressLastest[0].firstName} {addressLastest[0].lastName}
              <span className="ml-2">
                Tel : {addressLastest[0].phoneNumber}
              </span>
            </p>
            <p>
              {addressLastest[0].address} {addressLastest[0].postCode}
            </p>
          </div>
        </div>
        <hr className="border-1 border-gray-200" />
        {address.sort(compareFn).map((item, idx) => {
          return (
            <div key={item.id}>
              <div className="flex flex-row px-4 my-2 items-center gap-2">
                <input
                  id={item.id}
                  type="radio"
                  name="address"
                  className="w-5 h-5 checked:accent-red-500 cursor-pointer"
                  autoComplete="off"
                  onChange={(e)=>{
                    console.log(e.target.checked)
                    dispatch(selectNewAddress({id:+e.target.id}))
                  }}
                />
                <div className="w-full word-normal">
                  <div className="flex flex-row">
                    <p className="font-semibold text-base">
                      {item.addressTitle}
                    </p>
                  </div>
                  <p className="">
                    {item.firstName} {item.lastName}{" "}
                    <span className="ml-2">Tel : {item.phoneNumber}</span>
                  </p>
                  <p>
                    {item.address} {item.postCode}
                  </p>
                </div>
              </div>
              {(address.length - 1 !== idx || address.length<4) && (
                <hr className="border-1 border-gray-200" />
              )}
            </div>
          );
        })}
      </div>
      {/* <div className="py-2 mb-4 absolute w-full" >
          <CartAddNewAddress />
        </div> */}
      <div className="row-span-1 flex items-center justify-center border-t border-gray-200">
        <button
          type="submit"
          className="bg-red-600 w-40 py-2 text-white text-lg hover:bg-red-400"
        >
          Confirm
        </button>
      </div>
    </>
  );
}



