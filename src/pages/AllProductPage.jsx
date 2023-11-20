import { useEffect } from "react";
import ProductContainer from "../features/products/ProductContainer";

export default function AllProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => { // do when unmount component
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <ProductContainer />
  )
}
