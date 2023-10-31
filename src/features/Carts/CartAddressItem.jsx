import { useEffect } from "react";

export default function CartAddressItem({ address }) {
  const addressLastest = address.filter(item=>item.lastest===true)
  address = address.filter(item=>item.lastest!==true)
  useEffect(()=>{
    let lastest = document.getElementById('lastest')
    lastest.checked = true
  },[])
  return (
    <>
      <form>
        <div>
            <input type="radio" id="lastest" name="address" />
            kiki
        </div>
        {address.map((item) => {
          return (
            <div key={item.id}>
              <input type="radio" name="address" />
              eiei
            </div>
          );
        })}
      </form>
    </>
  );
}
