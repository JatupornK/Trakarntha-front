import "./App.css";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
function App() {
  // let div = document.querySelector("body");
  // div.style.overflowX = 'hidden'
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
