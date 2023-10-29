import { useEffect,useState } from "react";
import ProductBox from "../../components/ProductBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../stores/productSlice";
// import Modal from "../../components/Modal";
export default function ProductItem() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

// console.log(products)

// flex flex-wrap
  // console.log(products)
  return (
    <>
      <div className="container gap-x-5 grid md:grid-cols-2 lg:grid-cols-3 ">
        {products.map((item) => {
          return <ProductBox key={item.id} product={item}/>;
        })}
      </div>
      {/* {isOpen && <Modal onClose={()=>setIsOpen(false)} image={products} />} */}
    </>
  );
}
