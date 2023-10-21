import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticate ({children}) {
    const {userProfile} = useSelector(state=> state.user) 
    // console.log('/profile',userProfile)
    if(userProfile) {
        return <Navigate to={'/profile'} />
    }
    return children
}