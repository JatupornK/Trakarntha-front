import { AiOutlineClose } from "react-icons/ai";
import ProductSelect from "../features/products/ProductSelect";
export default function Modal({ onClose, product }) {
  // console.log(product);
  return (
    <>
      <div className="fixed left-0 top-0 h-full w-full z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-600 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="relative w-screen flex justify-center items-center h-screen">
            <div className="absolute bg-white container 2xl:w-4/6 xl:w-4/5   opacity-100 grid grid-flow-col grid-cols-12 ">
              <div className=" col-span-7">
                <div className="p-5">
                  <img
                    src={product.Images[0].image}
                    className={`object-fill`}
                  />
                </div>
              </div>
              <div className="col-span-5 py-10 break-normal pr-10 whitespace-normal">
                <div className="text-4xl font-bold">{product.name}</div>
                <div className="mt-3 text-lg max-h-36 text-ellipsis overflow-hidden">{product.description}</div>
                <h3 className="mt-3 text-2xl">฿ {product.price}</h3>
                <ProductSelect
                  product={product}
                  onClose={onClose}
                  // list={product.ProductSizes}
                  // name={product.name}
                  // price={product.price}
                />
                <div className="flex w-full justify-center mt-2">
                  <a
                    className="hover:text-gray-500 underline underline-offset-2"
                    href="/"
                  >
                    View more details
                  </a>
                </div>
              </div>
              <AiOutlineClose
                size={45}
                color="gray"
                className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
