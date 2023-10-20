import ProductItem from "./ProductItem";
import ProductSort from "./ProductSort";

export default function ProductList () {
    return (
        <div className="w-8/12 ">
            <ProductSort />
            <ProductItem />
        </div>
    )
}