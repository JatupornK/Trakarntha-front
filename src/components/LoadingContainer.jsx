// import { useEffect } from "react";
// import useLoading from "../hooks/useLoading";
import Modal from "./Modal";

export default function LoadingContainer() {
//   const { loading } = useLoading();
//   console.log(loading)
//   let div = document.querySelector("body");
//   useEffect(() => {
//     div.style.overflowY = loading ? "hidden" : "unset";
//   }, [loading]);
  return (
    <Modal style={{ height: "100px", backgroundColor: "transparent" }}>
      <div className="flex items-center justify-center col-span-12">
        <div className="text-6xl text-orange-300">Loading...</div>
      </div>
    </Modal>
  );
}
