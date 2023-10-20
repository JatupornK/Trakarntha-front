import { useDispatch, useSelector } from "react-redux";
import { setLoginOrRegister } from "../../stores/authSlice";

export default function LoginHeader() {
  const {loginOrRegister} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center pt-5">
      <div className="w-full grid grid-flow-col grid-cols-2">
        <div
          onClick={() => dispatch(setLoginOrRegister())}
          className={`mr-3 text-center cursor-pointer font-medium text-xl ${
            loginOrRegister ? "text-black" : "text-gray-500"
          } `}
        >
          <p>LOGIN</p>
          <hr className={`border-2 ${loginOrRegister ? "border-black" : ""} mt-1`} />
        </div>
        <div
          onClick={() => dispatch(setLoginOrRegister())}
          className={`text-center cursor-pointer font-medium text-xl ${
            !loginOrRegister ? "text-black" : "text-gray-500"
          } `}
        >
          <p>CREATE ACCOUNT</p>
          <hr className={`border-2 ${!loginOrRegister ? "border-black" : ""} mt-1`} />
        </div>
      </div>
    </div>
  );
}
