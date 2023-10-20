import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRegisterLoginInput,
  setLoginError,
  setLoginInput,
  setShowPassword,
} from "../../stores/authSlice";
import * as authApi from "../../apis/auth-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function LoginContent() {
  const { showPassword, loginInput, loginError } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const res = await authApi.login(loginInput);
      console.log(res)
      if (res.status === 201) {
        dispatch(resetRegisterLoginInput());
        toast.success(res.data.message);
        navigate("/all-products");
      }
    } catch (err) {
      dispatch(setLoginError(err.response?.data.message));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <div className="relative mt-7">
          <label
            htmlFor="email"
            className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
          >
            Email *
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className={`border px-4 pt-6 pb-2 w-full text-sm relative ${
              loginError && "border-red-500"
            }`}
            onChange={(e) =>
              dispatch(setLoginInput({ [e.target.name]: e.target.value }))
            }
            value={loginInput.email}
          />
        </div>
        {loginError && (
          <p className="text-red-500 text-xs mt-1">{loginError}</p>
        )}
        <div className="relative mt-6">
          <div
            onClick={() => dispatch(setShowPassword("login"))}
            className="absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {!showPassword.login ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <FaRegEye size={20} />
            )}
          </div>
          <label
            htmlFor="password"
            className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
          >
            Password *
          </label>
          <input
            type={showPassword.login ? "text" : "password"}
            id="password"
            name="password"
            className={`border px-4 pt-6 pb-2 w-full text-sm relative ${
              loginError && "border-red-500"
            }`}
            onChange={(e) =>
              dispatch(setLoginInput({ [e.target.name]: e.target.value }))
            }
            value={loginInput.password}
          />
        </div>
        {loginError && (
          <p className="text-red-500 text-xs mt-1">{loginError}</p>
        )}
        <button
          type="submit"
          className="bg-black text-white p-3 w-full mt-6 hover:bg-gray-700"
        >
          SIGN-IN AND CONTINUE
        </button>
      </form>
    </>
  );
}
