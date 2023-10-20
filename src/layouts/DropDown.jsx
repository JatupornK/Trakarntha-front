import { Link } from "react-router-dom";

export default function DropDown({ title, isHover }) {


  return (
    <>
      {title.map(
        (item) =>
          isHover && (
            <Link to={item.link}>
              <li
                //   onClick={handleLink}
                key={item.collection}
                className={`relative text-center hover:setIsHover(true) hover:handlehover px-2 pb-2 ml-2
            rounded-md hover:text-red-400 hover:underline underline-offset-2`}
              >
                {item.collection}
              </li>
            </Link>
          )
      )}
    </>
  );
}
