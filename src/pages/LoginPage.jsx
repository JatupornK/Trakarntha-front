import { useEffect } from "react";
import LoginContainer from "../features/Login/LoginContainer";


export default function LoginPage () {
    useEffect(() => {
        window.scrollTo(0, 0);
        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
          };
      
          window.addEventListener('beforeunload', handleBeforeUnload);
      
          return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };
      }, []);
    return (
        <>
            <LoginContainer />
        </>
    )
}