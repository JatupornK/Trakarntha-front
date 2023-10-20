import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RedirectIfNotAuthenticate ({children}) {
    const {userProfile} = useSelector(state=>state.user);
    console.log('/login',userProfile)
    if(!userProfile){
        return <Navigate to={'/login'} />
    }
    return children
}