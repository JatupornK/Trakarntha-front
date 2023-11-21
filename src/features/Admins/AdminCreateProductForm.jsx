import { useDispatch, useSelector } from "react-redux";
// import * as productApi from "../../apis/product-api";
import { useEffect } from "react";
// import { fetchProductSize, fetchProductType } from "../../stores/productSlice";
import AdminSelectProductType from "./AdminSelectProductType";
import AdminSelectProductSize from "./AdminSelectProductSize";
import {toast} from 'react-toastify';
import * as adminApi from '../../apis/admin-api'
import {
  resetCreateProductForm,
  setCreateProductInput,
  setErrorCreateProductInput,
  setErrorProductImage,
} from "../../stores/adminSlice";
import AdminAddImage from "./AdminAddImage";
import { validateCreateProductForm } from "../../validators/ValidateCreateProduct";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";

export default function AdminCreateProductForm() {
  const { productType, productSize } = useSelector((state) => state.products);
  const { createProductInput, errorCreateProductInput, productImage } = useSelector(
    (state) => state.admin
  );
  const {startLoading, stopLoading} = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    console.log(createProductInput)
  useEffect(() => {
    const textarea = document.getElementById("productDescription");
    const label = document.getElementById("productDescriptionLabel");
    const handleScroll = () => {
      if (textarea.scrollTop > 0) {
        label.classList.add("hidden");
      } else {
        label.classList.remove("hidden");
      }
    };

    textarea.addEventListener("scroll", handleScroll);

    return () => {
      textarea.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
        // clean up URL.createObjectURL when the form sent success and navigate to another page
    return () => {
      if (productImage.productImageMain) {
        URL.revokeObjectURL(productImage.productImageMain);
      }
      if (productImage.productImageSub) {
        URL.revokeObjectURL(productImage.productImageSub);
      }
    };
  }, [productImage.productImageMain, productImage.productImageSub]);

  const handleSubmitForm = async(e) => {
    try {
      e.preventDefault();
      startLoading();
      const isError = validateCreateProductForm(createProductInput);
      if (isError) {
        dispatch(setErrorCreateProductInput(isError));
        if(!productImage.productImageMain){
          dispatch(setErrorProductImage({productImageMain: 'Please attach image main'}))
        }
        if(!productImage.productImageSub){
          dispatch(setErrorProductImage({productImageSub: 'Please attach image sub'}))
        }
      }else if(!productImage.productImageMain||!productImage.productImageSub){
        if(!productImage.productImageMain){
          dispatch(setErrorCreateProductInput());
          dispatch(setErrorProductImage({productImageMain: 'Please attach image main'}))
        }
        if(!productImage.productImageSub){
          dispatch(setErrorCreateProductInput());
          dispatch(setErrorProductImage({productImageSub: 'Please attach image sub'}))
        }
      }else {
        const formData = new FormData();
        formData.append('name', createProductInput.name);
        formData.append('price', createProductInput.price);
        formData.append('description', createProductInput.description);
        formData.append('type', createProductInput.type);
        formData.append('size', createProductInput.size);
        formData.append('productImageMain', productImage.productImageMain);
        formData.append('productImageSub', productImage.productImageSub);
        const res = await adminApi.createProduct(formData);
        console.log(res)
        if(res.status===201){
          dispatch(resetCreateProductForm()); // reset productImage and all form input
          toast.success('Create new product success.');
          navigate('/all-products')
        }
      }
    } catch (err) {
      toast.error('Fail to create new product, Please try again later.')
      console.log(err)
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="relative mt-7">
        <label
          htmlFor="productName"
          className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
        >
          Product name *
        </label>
        <input
          type="text"
          id="productName"
          name="name"
          className={`border px-4 pt-6 pb-2 w-full text-sm ${
            errorCreateProductInput?.name && "border-red-500"
          }}`}
          onChange={(e) =>
            dispatch(
              setCreateProductInput({
                input: { [e.target.name]: e.target.value },
              })
            )
          }
          value={createProductInput.name}
        />
      </div>
      {errorCreateProductInput?.name && (
        <p className="text-red-500 text-xs mt-1">
          {errorCreateProductInput?.name}
        </p>
      )}
      <div className="relative mt-5">
        <label
          htmlFor="productPrice"
          className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
        >
          Product price *
        </label>
        <input
          type="text"
          id="productPrice"
          name="price"
          className={`border px-4 pt-6 pb-2 w-full text-sm ${
            errorCreateProductInput?.price && "border-red-500"
          }}`}
          onChange={(e) =>
            dispatch(
              setCreateProductInput({
                input: { [e.target.name]: +e.target.value },
              })
            )
          }
          value={createProductInput.price}
        />
      </div>
      {errorCreateProductInput?.price && (
        <p className="text-red-500 text-xs mt-1">
          {errorCreateProductInput?.price}
        </p>
      )}
      <div className="relative mt-5">
        <label
          htmlFor="productDescription"
          id="productDescriptionLabel"
          className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
        >
          Product description *
        </label>
        <textarea
          type="text"
          id="productDescription"
          name="description"
          className={`border px-4 pt-6 pb-2 w-full text-sm ${
            errorCreateProductInput?.description && "border-red-500"
          }}`}
          onChange={(e) =>
            dispatch(
              setCreateProductInput({
                input: { [e.target.name]: e.target.value },
              })
            )
          }
          value={createProductInput.description}
        />
      </div>
      {errorCreateProductInput?.description && (
        <p className="text-red-500 text-xs mt-1">
          {errorCreateProductInput?.description}
        </p>
      )}
      <div className="flex flex-row gap-10">
        <AdminSelectProductType type={productType} />
        <div>
          <AdminSelectProductSize size={productSize} />
          {errorCreateProductInput?.size && (
            <p className="text-red-500 text-xs absolute">
              {errorCreateProductInput?.size}
            </p>
          )}
        </div>
      </div>
      <AdminAddImage />
      <button
        type="submit"
        className="bg-black text-white p-3 w-full mt-6 mb-12 hover:bg-gray-700"
      >
        Create product
      </button>
    </form>
  );
}
