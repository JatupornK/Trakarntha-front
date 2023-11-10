import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuList from "./MenuList";
import { AiOutlineShoppingCart } from "react-icons/ai";
import profile from "../assets/User-pic.png";
import { useEffect, useRef, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../stores/authSlice";
import DropDownProfileBox from "../features/Login/DropDownProfileBox";
import { setIsHoverProfile } from "../stores/userSlice";
// import * as authApi from '../apis/auth-api'
export default function Header() {
  const [scrollDirection, setScrollDirection] = useState("up");
  // const [headerHeight, setHeaderHeight] = useState(null);
  const { userProfile, cartData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    // console.log(window.innerWidth, document.documentElement.clientWidth)
    // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // ref.current.style.width = `${window.innerWidth+'px'}`;
    // console.dir(ref.current.style)
    let headerRelative = document.querySelector('.headerRelative')
    headerRelative.style.height = ref.current.offsetHeight+'px'
    dispatch(fetchUserData());//fetch when have token no need to login again
  }, []);
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      let floor = scrollY < 180 ? 180 : 1;
      // if(scrollY < 10) {
      //   setScrollDirection('');
      // }else {
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
    // };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);
  return (
    <>
      <div className={`headerRelative ${scrollDirection==='up'? 'relative':'hidden'}`}></div>
      <div
        ref={ref}
        className={`container min-w-full ${
          scrollDirection === "up" ? "scroll-up" : "scroll-down"
        }`}
      >
        <div className="grid grid-flow-row grid-rows-3 items-center w-full">
          <div className="row-span-1 min-w-0 min-h-0 text-center ">
            <div className=" flex justify-center">
              <img
                className="mt-1"
                src="/logo.png"
                width={120}
                height={100}
              />
              <div className="mt-4 flex absolute w-20 container left-3/4">
                <div
                  className="relative z-10 cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <AiOutlineShoppingCart size={30} color="#c97f7f" />
                  {cartData.length > 0 && (
                    <div className="flex justify-center absolute w-5 h-5 bg-red-200 border-2 border-white text-red-700 rounded-full -translate-y-1 text-xs translate-x-2 top-0 right-0">
                      <span className="static">{cartData.length}</span>
                    </div>
                  )}
                </div>
                <div className="absolute -ml-2 grid gird-flow-row grid-rows-3">
                  <div className="flex items-center justify-center flex-col container">
                    {userProfile ? (
                      <img
                        className="rounded-full "
                        src={profile}
                        width={30}
                        height={30}
                        onMouseEnter={() => dispatch(setIsHoverProfile(true))}
                        onMouseLeave={() => dispatch(setIsHoverProfile(false))}
                      />
                    ) : (
                      <Link to={"/login"}>
                        <img
                          className="rounded-full "
                          src={profile}
                          width={30}
                          height={30}
                        />
                      </Link>
                    )}
                    <DropDownProfileBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-red-300 text-6xl font-bold text-center min-w-0 min-h-0 row-span-1 ">
            Trakarntha
          </p>
          <ul className="flex flex-row justify-center row-span-1 min-w-0 min-h-0 -mt-2">
            <MenuList />
          </ul>
        </div>
        <hr className="border-2 border-gray-200" />
      </div>
      <div className="min-vh-10">
        <Outlet />
      </div>
    </>
  );
}
{/*พอ render Header แล้วมาเจอ outlet มันจะไปวิ่งหา children ตาม path ปัจจุบัน*/}
