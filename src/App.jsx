import "./App.css";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
function App() {
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  const scrollBarWidth = getScrollbarWidth();
  const body = document.querySelector('body');
  body.style.paddingRight = scrollBarWidth+'px'
  return (
    <>
      <Router />
      <ToastContainer //pop up ถ้า fail, success
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
    </>
  );
}

export default App;
