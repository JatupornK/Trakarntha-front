import "./App.css";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useLoading from "./hooks/useLoading";
import LoadingContainer from "./components/LoadingContainer";
import { useEffect } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
function App() {

  const {loading} = useLoading();
  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = loading ? "hidden" : "unset";
  }, [loading]);
  console.log(loading)
  return (
    <>
      <Elements stripe={stripePromise}>
        <Router />
        {loading && <LoadingContainer />}
        <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Elements>
    </>
  );
}

export default App;
