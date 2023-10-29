export default function ProductModalContent() {
  return (
    <>
      <div
        className="p-4 pb-8 col-span-7 min-h-0 min-w-0 w-full h-full relative"
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
      <div className="relative col-span-5 py-5 break-normal pr-10 whitespace-normal h-full min-w-0 min-h-0">
        <div className="text-4xl font-bold">{product.name}</div>
        <div className="mt-3 text-lg max-h-36 text-ellipsis overflow-hidden ">
          {product.description}
        </div>
        <h3 className="mt-3 text-2xl">฿ {product.price.toLocaleString()}</h3>
        <ProductSelect product={product} onClose={onClose} />
        <div className="flex w-full justify-center mt-2">
          <a
            className="hover:text-gray-500 underline underline-offset-2"
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
    </>
  );
}
