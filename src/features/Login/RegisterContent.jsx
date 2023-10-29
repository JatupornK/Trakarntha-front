import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { validateRegister } from "../../validators/ValidateRegister";
import * as authApi from "../../apis/auth-api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRegisterLoginInput,
  setRegisterError,
  setLogin,
  setRegisterInput,
  setShowPassword,
} from "../../stores/authSlice";

export default function RegisterContent() {
  const { showPassword, registerError, registerInput } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // console.log(registerError)
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const result = validateRegister(registerInput);
      // console.log(result)
      if (result) {
        dispatch(setRegisterError(result));
      } else {
        // console.log('eie1i')
        dispatch(resetRegisterLoginInput());
        // console.log('eiei')
        const res = await authApi.createUser(registerInput);
        // console.log(res)
        if (res.status === 201) {
          dispatch(setLogin(true));
          toast.success(res.data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data.message);
      dispatch(setRegisterError({ email: err.response?.data.message }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <div className="relative mt-7">
          <label
            htmlFor="firstName"
            className="text-gray-400 absolute z-10 text-xs left-4 my-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`${
              registerError.firstName ? "border-red-500" : ""
            } border px-4 pt-6 pb-2 w-full text-sm relative`}
            onChange={(e) =>
              dispatch(setRegisterInput({ [e.target.name]: e.target.value }))
            }
            value={registerInput.firstName}
          />
        </div>
        {registerError.firstName && (
          <p className="text-red-500 text-xs mt-1">{registerError.firstName}</p>
        )}
        <div className="relative mt-6">
          <label
            htmlFor="lastName"
            className="text-gray-400 absolute z-10 text-xs left-4 my-2"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`${
              registerError.lastName ? "border-red-500" : ""
            } border px-4 pt-6 pb-2 w-full text-sm relative`}
            onChange={(e) =>
              dispatch(setRegisterInput({ [e.target.name]: e.target.value }))
            }
            value={registerInput.lastName}
          />
        </div>
        {registerError.lastName && (
          <p className="text-red-500 text-xs mt-1">{registerError.lastName}</p>
        )}
        <div className="relative mt-6">
          <label
            htmlFor="mobile"
            className="text-gray-400 absolute z-10 text-xs left-4 my-2"
          >
            Mobile *
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className={`${
              registerError.mobile ? "border-red-500" : ""
            } border px-4 pt-6 pb-2 w-full text-sm relative`}
            onChange={(e) =>
              dispatch(setRegisterInput({ [e.target.name]: e.target.value }))
            }
            value={registerInput.mobile}
          />
        </div>
        {registerError.mobile && (
          <p className="text-red-500 text-xs mt-1">{registerError.mobile}</p>
        )}
        <div className="relative mt-6">
          <label
            htmlFor="email"
            className="text-gray-400 absolute z-10 text-xs left-4 my-2"
          >
            Email *
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className={`${
              registerError.email ? "border-red-500" : ""
            } border px-4 pt-6 pb-2 w-full text-sm relative`}
            onChange={(e) =>
              dispatch(setRegisterInput({ [e.target.name]: e.target.value }))
            }
            value={registerInput.email}
          />
        </div>
        {registerError.email && (
          <p className="text-red-500 text-xs mt-1">{registerError.email}</p>
        )}
        <div className="relative mt-6">
          <div
            onClick={() => dispatch(setShowPassword("register"))}
            className="absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {!showPassword.register ? (
              <FaRegEyeSlash size={20} className="cursor-pointer" />
            ) : (
              <FaRegEye size={20} className="cursor-pointer" />
            )}
          </div>
          <label
            htmlFor="password"
            className="text-gray-400 absolute z-10 text-xs left-4 my-2"
          >
            Password *
          </label>
          <input
            type={showPassword.register ? "text" : "password"}
            id="password"
            name="password"
            className={`${
              registerError.password ? "border-red-500" : ""
            } border px-4 pt-6 pb-2 w-full text-sm relative`}
            onChange={(e) =>
              dispatch(setRegisterInput({ [e.target.name]: e.target.value }))
            }
            value={registerInput.password}
          />
        </div>
        {registerError.password && (
          <p className="text-red-500 text-xs mt-1">{registerError.password}</p>
        )}
        <button
          type="submit"
          className="bg-black text-white p-3 w-full mt-6 hover:bg-gray-700 mb-14"
        >
          SIGN-IN AND CONTINUE
        </button>
      </form>
    </>
  );
}
