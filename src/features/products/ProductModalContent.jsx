import ProductSelect from "./ProductSelect";
import { AiOutlineClose } from "react-icons/ai";

export default function ProductModalContent({
  onClose,
  product,
  handleChangeImageShow,
  imageShow,
}) {
  return (
    <>
    <div className="col-span-12 flex flex-col overflow-y-auto sm:grid sm:grid-cols-12">

      <div
        className="p-4 pb-8 col-span-7 mt-2 sm:mt-0 min-h-0 min-w-0 w-full h-full relative"
        onClick={handleChangeImageShow}
        >
        <div className=" absolute text-center text-xs bottom-0 w-full -ml-4 mb-2">
          Click the image to see another pictures.
        </div>
        <img
          src={product.Images[imageShow].image}
          className={`object-fill cursor-pointer block h-full w-full`}
          onClick={handleChangeImageShow}
          />
      </div>
      <div className="sm:relative col-span-5 py-5 px-2 break-normal p-0 sm:pr-10 whitespace-normal h-full min-w-0 min-h-0">
        <div className="md:text-2xl font-bold lg:text-4xl">{product.name}</div>
        <div className="mt-3 md:text-base lg:text-lg max-h-36 text-ellipsis overflow-hidden ">
          {product.description}
        </div>
        <h3 className="mt-3 md:text-lg lg:text-2xl">฿ {product.price.toLocaleString()}</h3>
        <ProductSelect product={product} onClose={onClose} />
        <div className="flex w-full justify-center mt-2 pb-3">
          <a
            className="hover:text-gray-500 underline underline-offset-2 mb-2 sm:mb-0"
            href="/"
            >
            View more details
          </a>
        </div>
        <AiOutlineClose
          size={45}
          color="gray"
          className="absolute right-1 top-2 hover:bg-gray-100 rounded-2xl p-1 mr-2 cursor-pointer"
          onClick={onClose}
          />
      </div>
          </div>
    </>
  );
}
