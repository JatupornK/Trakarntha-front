import { AiOutlineCloseCircle, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsHoverProfile,
  userLogout,
} from "../../stores/userSlice";
import { removeAccessToken } from "../../utills/localStorage";
import { useNavigate } from "react-router-dom";
export default function DropDownProfileBox() {
  const { isHoverProfile, userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${
          isHoverProfile && userProfile ? "border border-1" : ""
        } relative w-36 cursor-pointer text-left`}
        onMouseEnter={() => dispatch(setIsHoverProfile(true))}
        onMouseLeave={() => dispatch(setIsHoverProfile(false))}
      >
        {isHoverProfile && userProfile && (
          <>
            <div
              className="text-sm relative py-2 px-3 flex flex-row gap-2 hover:bg-gray-100"
              onClick={() => {
                dispatch(setIsHoverProfile(false));
                navigate("/profile");
              }}
            >
              <div className="text-xs">
                <AiOutlineUser size={20} />
              </div>
              MY PROFILE
            </div>
            <div
              className="text-sm relative py-2 px-3 flex flex-row gap-2 hover:bg-gray-100"
              onClick={() => {
                navigate("/login");
                removeAccessToken();
                dispatch(userLogout());
              }}
            >
              <div className="text-xs">
                <AiOutlineCloseCircle size={20} />
              </div>
              SIGN OUT
            </div>
          </>
        )}
      </div>
    </>
  );
}
