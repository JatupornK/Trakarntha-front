import { useDispatch, useSelector } from "react-redux";
import { validateCreateAddress } from "../../validators/ValidateCreateAddress";
import {
  setErrorCreateAddress,
  setInputCreateAddress,
  createNewAddress,
  setError,
  selectNewAddress,
  setUserProfile,
  editUserProfileAddress,
} from "../../stores/userSlice";
import * as userApi from "../../apis/user-api";
import useLoading from "../../hooks/useLoading";
export default function CartModalAddNewAddress({ onSuccess, edit }) {
  const { inputCreateAddress, errorCreateAddress, editAddressId, userProfile } =
    useSelector((state) => state.user);
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      startLoading();
      console.log(inputCreateAddress);
      const isError = validateCreateAddress(inputCreateAddress);
      if (isError) {
        dispatch(setErrorCreateAddress(isError));
      } else {
        if (edit) {
          if (
            userProfile.Addresses.findIndex(
              (item) =>
                item.addressTitle === inputCreateAddress.addressTitle &&
                item.firstName === inputCreateAddress.firstName &&
                item.lastName === inputCreateAddress.lastName &&
                item.address === inputCreateAddress.address &&
                item.phoneNumber === inputCreateAddress.phoneNumber &&
                item.postCode === inputCreateAddress.postCode
            ) !== -1
          ) {
            dispatch(setError({ address: "" }));
            onSuccess();
            return;
          }
          const res = await userApi.editAddress({
            Address: inputCreateAddress,
            id: editAddressId.id,
          });
          if (res.status === 201) {
            dispatch(
              editUserProfileAddress({
                id: editAddressId.id,
                value: inputCreateAddress,
              })
            );
            dispatch(setError({ address: "" }));
            onSuccess();
            return;
          }
        }
        const res = await userApi.createNewAddress(inputCreateAddress);
        if (res.status === 201) {
          onSuccess();
          dispatch(createNewAddress(res.data.message));
          dispatch(setError({ address: "" }));
          dispatch(selectNewAddress({ id: res.data.message.id }));
        }
      }
    } catch (err) {
      alert(err.message);
    } finally {
      stopLoading();
    }
  };
  return (
    <form
      id="create-new-address-form"
      onSubmit={(e) => handleSubmit(e)}
      className="grid grid-flow-row grid-cols-4 gap-5 mt-6"
    >
      <div className="relative col-span-4">
        <label
          htmlFor="addressTitle"
          className="text-gray-400 absolute z-10 text-xs left-3 my-1 top-1"
        >
          Address Title *
        </label>
        <input
          type="text"
          id="addressTitle"
          name="addressTitle"
          className={`border px-3 pt-5 pb-2 w-full text-sm relative ${
            errorCreateAddress.addressTitle ? "border-red-500" : ""
          }`}
          value={inputCreateAddress.addressTitle}
          onChange={(e) =>
            dispatch(setInputCreateAddress({ [e.target.name]: e.target.value }))
          }
        />
        {errorCreateAddress?.addressTitle && (
          <p className="absolute text-xs text-red-500">
            {errorCreateAddress.addressTitle}
          </p>
        )}
      </div>
      <div className="relative col-span-4">
        <label
          htmlFor="firstName"
          className="text-gray-400 absolute z-10 text-xs left-3 my-1 top-1"
        >
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className={`border px-3 pt-5 pb-2 w-full text-sm relative ${
            errorCreateAddress.firstName ? "border-red-500" : ""
          }`}
          value={inputCreateAddress.firstName}
          onChange={(e) =>
            dispatch(setInputCreateAddress({ [e.target.name]: e.target.value }))
          }
        />
        {errorCreateAddress?.firstName && (
          <p className="absolute text-xs text-red-500">
            {errorCreateAddress.firstName}
          </p>
        )}
      </div>
      <div className="relative col-span-4">
        <label
          htmlFor="lastName"
          className="text-gray-400 absolute z-10 text-xs left-3 my-1 top-1"
        >
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className={`border px-3 pt-5 pb-2 w-full text-sm relative ${
            errorCreateAddress.lastName ? "border-red-500" : ""
          }`}
          value={inputCreateAddress.lastName}
          onChange={(e) =>
            dispatch(setInputCreateAddress({ [e.target.name]: e.target.value }))
          }
        />
        {errorCreateAddress?.lastName && (
          <p className="absolute text-xs text-red-500">
            {errorCreateAddress.lastName}
          </p>
        )}
      </div>
      <div className="relative col-span-4">
        <label
          htmlFor="address"
          className="text-gray-400 absolute z-10 text-xs left-3 my-1 top-1"
        >
          Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className={`border px-3 pt-5 pb-2 w-full text-sm relative ${
            errorCreateAddress.address ? "border-red-500" : ""
          }`}
          value={inputCreateAddress.address}
          onChange={(e) =>
            dispatch(setInputCreateAddress({ [e.target.name]: e.target.value }))
          }
        />
        {errorCreateAddress?.address && (
          <p className="absolute text-xs text-red-500">
            {errorCreateAddress.address}
          </p>
        )}
      </div>
      <div className="relative col-span-2">
        <label
          htmlFor="phoneNumber"
          className="text-gray-400 absolute z-10 text-xs left-3 my-1 top-1"
        >
          Phone Number *
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          className={`border px-3 pt-5 pb-2 w-full text-sm relative ${
            errorCreateAddress.phoneNumber ? "border-red-500" : ""
          }`}
          value={inputCreateAddress.phoneNumber}
          onChange={(e) =>
            dispatch(setInputCreateAddress({ [e.target.name]: e.target.value }))
          }
        />
        {errorCreateAddress?.phoneNumber && (
          <p className="absolute text-xs text-red-500">
            {errorCreateAddress.phoneNumber}
          </p>
        )}
      </div>
      <div className="relative col-span-2">
        <label
          htmlFor="postCode"
          className="text-gray-400 absolute z-10 text-xs left-3 my-1 top-1"
        >
          Post Code *
        </label>
        <input
          type="text"
          id="postCode"
          name="postCode"
          className={`border px-3 pt-5 pb-2 w-full text-sm relative ${
            errorCreateAddress.postCode ? "border-red-500" : ""
          }`}
          value={inputCreateAddress.postCode}
          onChange={(e) =>
            dispatch(setInputCreateAddress({ [e.target.name]: e.target.value }))
          }
        />
        {errorCreateAddress?.postCode && (
          <p className="absolute text-xs text-red-500">
            {errorCreateAddress.postCode}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="p-2 mt-1 text-lg w-full bg-red-500 hover:bg-red-400 text-white col-span-4"
      >
        Submit
      </button>
    </form>
  );
}
