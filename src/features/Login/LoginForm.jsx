import LoginContent from "./LoginContent";
import LoginHeader from "./LoginHeader";
import { useDispatch } from "react-redux";
import { resetRegisterLoginInput } from "../../stores/authSlice";
import RegisterContent from "./RegisterContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function LoginForm() {
  // const [isLog, setIsLog] = useState(true);
  const { loginOrRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetRegisterLoginInput());
  }, []);
  return (
    <>
      <LoginHeader />
      {loginOrRegister ? <LoginContent /> : <RegisterContent />}
      {/* <LoginHeader isLog={isLog} setIsLog={setIsLog} />
      {isLog ? <LoginContent /> : <RegisterContent setIsLog={setIsLog}/>} */}
    </>
  );
}
