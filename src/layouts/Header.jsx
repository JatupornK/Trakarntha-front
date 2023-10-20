import { Link, Navigate, Outlet } from "react-router-dom";
import MenuList from "./MenuList";
import { AiOutlineShoppingCart } from "react-icons/ai";
import profile from "../assets/User-pic.png";
import { useEffect, useState } from "react";
import "../App.css";
export default function Header() {
  const [scrollDirection, setScrollDirection] = useState("up");
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      // console.log(
      //   scrollY,
      //   lastScrollY,
      //   scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10
      // );
      let floor = scrollY < 180 ? 180 : 1;
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > floor || scrollY - lastScrollY < -floor)
      ) {
        setScrollDirection(direction);
      }
      if (scrollY === 0) {
        setScrollDirection("up");
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);
  // console.log(scrollDirection)
  return (
    <>
      <div
        className={`${scrollDirection === "up" ? "scroll-up" : "scroll-down"}`}
      >
        <div className="grid grid-flow-row grid-rows-3 items-center">
          <div className="row-span-1 text-center grid grid-cols-4">
            <div className="col-span-4 flex justify-center">
              <img
                className="mt-1"
                src="../../public/logo.png"
                width={120}
                height={100}
              />
              <div className="mt-4 flex absolute ml-96 pl-96">
                <div className="relative">
                  <AiOutlineShoppingCart size={30} color="#c97f7f" />
                  <div className="flex justify-center absolute w-5 h-5 bg-red-200 border-2 border-white text-red-700 rounded-full -translate-y-1 text-xs translate-x-2 top-0 right-0">
                    1
                  </div>
                </div>
                <Link to={"/login"}>
                  <img
                    className="ml-4 rounded-full"
                    src={profile}
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* </div> */}
          <p className="text-red-300 text-6xl font-bold text-center row-span-1 ">
            Trakarntha
          </p>
          <ul className="flex flex-row justify-center row-span-1 -mt-2">
            <MenuList />
          </ul>
        </div>
        <hr className="border-2 border-gray-200" />
      </div>
      <div className="min-vh-100 tw-pt-14">
        <Outlet />
        {/*พอ render Header แล้วมาเจอ outlet มันจะไปวิ่งหา children ตาม path ปัจจุบัน*/}
      </div>
    </>
  );
}
