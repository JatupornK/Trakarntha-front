import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utills/localStorage";

export default function RedirectIfNotAuthenticate({ children }) {
  if (!getAccessToken()) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
