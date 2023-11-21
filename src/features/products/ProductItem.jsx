import { useEffect,useState } from "react";
import ProductBox from "../../components/ProductBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../stores/productSlice";
// import Modal from "../../components/Modal";
export default function ProductItem() {
  const { products } = useSelector((state) => state.products);
  const {userProfile} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false);
  // console.log(products)
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  let enableProducts;
  if(userProfile?.role!=='admin'){
    enableProducts = products.filter(item=>item.isDisabled===false);
  }else {
    enableProducts = products
  }
  console.log(enableProducts)
// console.log(products)

// flex flex-wrap
  // console.log(products)
  return (
    <>
      <div className="container gap-x-5 grid md:grid-cols-2 lg:grid-cols-3 ">
        {enableProducts.map((item) => {
          return <ProductBox key={item.id} product={item}/>;
        })}
      </div>
      {/* {isOpen && <Modal onClose={()=>setIsOpen(false)} image={products} />} */}
    </>
  );
}
