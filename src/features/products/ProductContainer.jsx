import ProductList from "./ProductList";
import ProductSideFilter from "./ProductSideFilter";

export default function ProductContainer() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center"><h1 className="text-3xl sm:text-5xl font-bold my-10">All PRODUCTS</h1></div>
      <div className="flex md:flex-row flex-col items-center md:items-start w-full md:justify-evenly md:max-w-7xl h-screen">
        <ProductSideFilter />
        <ProductList />
      </div>
    </div>
  );
}
