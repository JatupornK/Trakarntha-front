import LoginContent from "./LoginContent";
import LoginHeader from "./LoginHeader";
// import { useState } from "react";
import RegisterContent from "./RegisterContent";
import {useSelector} from 'react-redux'
export default function LoginForm() {
  // const [isLog, setIsLog] = useState(true);
  const {loginOrRegister} = useSelector(state=>state.auth)
  return (
    <>
      <LoginHeader  />
      {loginOrRegister ? <LoginContent /> : <RegisterContent />}
      {/* <LoginHeader isLog={isLog} setIsLog={setIsLog} />
      {isLog ? <LoginContent /> : <RegisterContent setIsLog={setIsLog}/>} */}
    </>
  );
}
