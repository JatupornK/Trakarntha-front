import { useEffect } from "react";
import ProductContainer from "../features/products/ProductContainer";

export default function AllProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);
  return (
    <ProductContainer />
  )
}
