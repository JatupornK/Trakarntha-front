import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRegisterLoginInput,
  setLoginError,
  setLoginInput,
  setShowPassword,
} from "../../stores/authSlice";
import { fetchCartData, setUserProfile } from "../../stores/userSlice";
import * as authApi from "../../apis/auth-api";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utills/localStorage";
import { validateLogin } from "../../validators/ValidateRegister";
export default function LoginContent() {
  const { showPassword, loginInput, loginError } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const result = validateLogin(loginInput);
      if (result) {
        dispatch(setLoginError(result));
      } else {
        dispatch(resetRegisterLoginInput());
        const res = await authApi.login(loginInput);
        if (res.status === 201) {
          setAccessToken(res.data.accessToken);
          const[user,cart] = await Promise.all([authApi.getMe(),authApi.getUserCartData()])
          dispatch(setUserProfile(user.data.user));
          dispatch(fetchCartData(cart.data.productsInCart))
          navigate("/profile");
        }
      }
      // console.log(res)
    } catch (err) {
      dispatch(
        setLoginError({
          email: err.response?.data.message,
          password: err.response?.data.message,
        })
      );
    }
  };
  return (
    <>
      <form id="login-form" onSubmit={handleSubmitForm}>
        <div className="relative mt-7">
          <label
            htmlFor="email-login"
            className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
          >
            Email *
          </label>
          <input
            type="text"
            id="email-login"
            name="email"
            className={`border px-4 pt-6 pb-2 w-full text-sm relative ${
              loginError?.email && "border-red-500"
            }`}
            onChange={(e) =>
              dispatch(setLoginInput({ [e.target.name]: e.target.value }))
            }
            value={loginInput.email}
            // autoComplete="off"
          />
        </div>
        {loginError?.email && (
          <p className="text-red-500 text-xs mt-1">{loginError?.email}</p>
        )}
        <div className="relative mt-6">
          <div
            onClick={() => dispatch(setShowPassword("login"))}
            className="absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {!showPassword.login ? (
              <FaRegEyeSlash size={20} className="cursor-pointer" />
            ) : (
              <FaRegEye size={20} className="cursor-pointer" />
            )}
          </div>
          <label
            htmlFor="password-login"
            className="text-gray-400 absolute z-10 text-xs left-4 my-1 top-1"
          >
            Password *
          </label>
          <input
            type={showPassword.login ? "text" : "password"}
            id="password-login"
            name="password"
            className={`border px-4 pt-6 pb-2 w-full text-sm relative ${
              loginError?.password && "border-red-500"
            }`}
            onChange={(e) =>
              dispatch(setLoginInput({ [e.target.name]: e.target.value }))
            }
            value={loginInput.password}
            autoComplete="off"
          />
        </div>
        {loginError?.password && (
          <p className="text-red-500 text-xs mt-1">{loginError?.password}</p>
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
