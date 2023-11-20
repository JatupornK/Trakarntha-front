import "./App.css";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
function App() {
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  const scrollBarWidth = getScrollbarWidth();
  const body = document.querySelector('body');
  console.log(scrollBarWidth, body)
  body.style.paddingRight = scrollBarWidth+'px'
  // console.log(body.style.paddingRights)
  return (
    <>
      <Elements stripe={stripePromise}>
        <Router />
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
