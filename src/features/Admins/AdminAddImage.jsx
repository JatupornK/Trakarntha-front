import { useSelector } from "react-redux";
import ImageMain from "./ImageMain";
import ImageSub from "./ImageSub";
import { useEffect } from "react";

export default function AdminAddImage() {
  const { productImage,errorProductImage } = useSelector((state) => state.admin);

  useEffect(() => {
    // clean up URL.createObjectURL when image is changed to reduce oppotunity of memory leak
    return () => {
      if (productImage.productImageMain) {
        URL.revokeObjectURL(productImage.productImageMain);
      }
      if (productImage.productImageSub) {
        URL.revokeObjectURL(productImage.productImageSub);
      }
    };
  }, [productImage.productImageMain, productImage.productImageSub]);

  return (
    <>
      <div className="mt-5">
        <div className="flex flex-row gap-3 mt-4">
          Product Image Main :<ImageMain />
        </div>
        {errorProductImage?.productImageMain && (
          <p className="text-red-500 text-xs mt-1 text-center">{errorProductImage?.productImageMain}</p>
        )}
        {productImage.productImageMain && (
          <div className="flex justify-center mt-3">
            <img
              className="w-40 h-40 border border-black"
              src={URL.createObjectURL(productImage.productImageMain)}
            />
          </div>
        )}
        <div className="flex flex-row gap-3 mt-4">
          Product Image Sub :<ImageSub />
        </div>
        {errorProductImage?.productImageSub && (
          <p className="text-red-500 text-xs mt-1 text-center">{errorProductImage?.productImageSub}</p>
        )}
        {productImage.productImageSub && (
          <div className="flex justify-center mt-3">
            <img
              className="w-40 h-40 border border-black"
              src={URL.createObjectURL(productImage.productImageSub)}
            />
          </div>
        )}
      </div>
    </>
  );
}
