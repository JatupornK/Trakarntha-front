import { useSelector } from "react-redux";
import List from "./List";

const menuList = [
  { link: "/", title: "Home" },
  { link: "/promotion", title: "Promotion" },
  {
    link: "/collection",
    title: "Collection",
    // dropDown: ["My Darling", "Lucky Me"],
    // dropDown: [{collection:'My Darling', link:'/collection/my-darling'},{collection:'Lucky Me', link:'/collection/my-darling'}]
  },
  { link: "/all-products", title: "All Product" },
  { link: "/our-story", title: "Our Story" },
  { link: "/membership", title: "Membership" },
  // { link: '/', title:'More'}
];
export default function MenuList() {
  const {userProfile} = useSelector(state=> state.user);
  
  return (
    <>
      {menuList.map((item, idx) => (
        <List key={item.title} link={item.link} title={item.title} idx={idx} />
      ))}
      {userProfile && userProfile.role==='admin'&& <List link={'/admin'} title={'Admin Management'} />}
    </>
  );
}
