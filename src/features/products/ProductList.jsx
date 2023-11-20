import ProductItem from "./ProductItem";
import ProductSort from "./ProductSort";

export default function ProductList () {
    return (
        <div className="w-10/12 sm:w-6/12 lg:w-8/12">
            <ProductSort />
            <ProductItem />
        </div>
    )
}