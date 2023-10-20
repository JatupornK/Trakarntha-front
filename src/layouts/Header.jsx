import { Link, Navigate, Outlet } from "react-router-dom";
import MenuList from "./MenuList";
import { AiOutlineShoppingCart } from "react-icons/ai";
import profile from "../assets/User-pic.png";
import { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../stores/authSlice";
import DropDownProfileBox from "../features/Login/DropDownProfileBox";
import { setIsHoverProfile } from "../stores/userSlice";
export default function Header() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    dispatch(fetchUserData());
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

  return (
    <>
      <div
        className={`${scrollDirection === "up" ? "scroll-up" : "scroll-down"}`}
      >
        <div className="grid grid-flow-row grid-rows-3 items-center container">
          <div className="row-span-1 text-center ">
            <div className=" flex justify-center">
              <img
                className="mt-1"
                src="../../public/logo.png"
                width={120}
                height={100}
              />
              <div className="mt-4 flex absolute w-20 container xl:left-3/4  lg:left-3/4 md:left-1/2">
                <div className="relative">
                  <AiOutlineShoppingCart size={30} color="#c97f7f" />
                  <div className="flex justify-center absolute w-5 h-5 bg-red-200 border-2 border-white text-red-700 rounded-full -translate-y-1 text-xs translate-x-2 top-0 right-0">
                    1
                  </div>
                </div>
                <div className="absolute">
                  <div className="flex items-center justify-center flex-col container">
                    <Link to={"/login"}>
                      {userProfile ? (
                        <img
                          className="rounded-full "
                          src={profile}
                          width={30}
                          height={30}
                          onMouseEnter={() => dispatch(setIsHoverProfile(true))}
                          onMouseLeave={() =>
                            dispatch(setIsHoverProfile(false))
                          }
                        />
                      ) : (
                        <img
                          className="rounded-full "
                          src={profile}
                          width={30}
                          height={30}
                        />
                      )}
                    </Link>
                    <DropDownProfileBox />
                  </div>
                </div>
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
