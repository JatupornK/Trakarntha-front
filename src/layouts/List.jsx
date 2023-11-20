import { Link } from "react-router-dom"
// import { useState } from "react";

export default function List ({link, title, idx}) {
//     const [isHover, setIsHover] = useState(false);

//   const handleHover = () => {
//     setIsHover(true);
//   };
//   const handleNotHover = () => {
//     setIsHover(false);
//   };
    return (
        <Link to={link}>
        <li
          className={`text-center hover:setIsHover(true) hover:handlehover px-3 pt-1 pb-2 ${
            idx === 0 ? "" : "lg:ml-8 md:ml-0"
          } rounded-md hover:text-red-400 hover:underline underline-offset-2`}
        >
          {title}
        </li>
      </Link>
    )
}