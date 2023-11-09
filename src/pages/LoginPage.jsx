import { useEffect } from "react";
import LoginContainer from "../features/Login/LoginContainer";


export default function LoginPage () {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
      }, []);
    return (
        <>
            <LoginContainer />
        </>
    )
}