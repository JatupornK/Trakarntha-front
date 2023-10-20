import ProductList from "./ProductList";
import ProductSideFilter from "./ProductSideFilter";

export default function ProductContainer() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center"><h1 className="text-5xl font-bold my-10">All PRODUCTS</h1></div>
      <div className="flex w-full justify-evenly max-w-7xl h-screen">
        <ProductSideFilter />
        <ProductList />
      </div>
    </div>
  );
}
