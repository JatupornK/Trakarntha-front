import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import {
  clickDecreaseProductInCart,
  clickIncreaseProductInCart,
  deleteProductFromCart,
} from "../../stores/userSlice";
export default function CartProductItem() {
  const { cartData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(cartData);
  //   let cartShow = cartData.reduce((acc, item) => {
  //   }, []);
  //   console.log(cartShow);
  return (
    <>
      {cartData.map((item, idx) => (
        <div key={item.id}>
          <hr className="w-full border-gray border-1"></hr>
          <div className="h-44 py-4">
            <div className="grid grid-flow-col grid-cols-4 h-full">
              <div className="h-full w-full col-span-1 min-w-0 min-h-0 flex items-center">
                <img className="object-fill h-full" src={item.image} />
              </div>
              <div className="col-span-2 min-w-0 min-h-0 flex flex-col p-1 ml-5 justify-between">
                <div className="text-sm flex flex-col gap-2">
                  <h4 className="text-xl">{item.name}</h4>
                  {item.size && <h5>Size: {item.size}</h5>}
                  <h5>฿ {item.price.toLocaleString()}</h5>
                </div>
                <div className="flex items-center border border-gray-400 w-fit h-6 cursor-pointer">
                  <AiOutlineMinus
                    color={`${+item.amount === 1 ? "BDB7B7" : ""}`}
                    onClick={() =>{
                      if(+item.amount-1===0) return ;
                      dispatch(
                        clickDecreaseProductInCart(idx, {
                          cartId: item.id,
                          amount: +item.amount - 1,
                          sumPrice: +item.sumPrice - item.price,
                        })
                        )
                      }
                    }
                    size={22.5}
                    className="border-r border-gray-400 p-1 hover:bg-gray-200"
                  />
                  <input
                    className="bg-transparent w-8 text-center text-sm cursor-pointer"
                    name="quantity"
                    id="quantity"
                    disabled
                    value={+item.amount}
                  />
                  <AiOutlinePlus
                    onClick={() =>
                      dispatch(
                        clickIncreaseProductInCart(idx, {
                          cartId: item.id,
                          amount: +item.amount + 1,
                          sumPrice: +item.sumPrice + item.price,
                        })
                      )
                    }
                    size={22.5}
                    className=" border-l border-gray-400 p-1 hover:bg-gray-200"
                  />
                </div>
              </div>
              <div className="col-span-1 min-w-0 min-h-0 text-xl flex p-1 relative flex-col justify-end items-end">
                <h6 className="text-base">
                  Total: ฿ {Number(item.sumPrice).toLocaleString()}
                </h6>
                <AiOutlineClose
                  onClick={() => dispatch(deleteProductFromCart(item.id))}
                  className="hover:bg-gray-200 rounded-md p-1 cursor-pointer absolute right-0 top-0"
                  size={30}
                />
              </div>
            </div>
          </div>
          {cartData.length-1===idx && <hr className="w-full border-gray border-1"></hr>}
        </div>
      ))}
    </>
  );
}
