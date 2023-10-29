import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utills/localStorage";

export default function RedirectIfAuthenticate ({children}) {
    if(getAccessToken()) {
        return <Navigate to={'/profile'} />
    }
    return children
}