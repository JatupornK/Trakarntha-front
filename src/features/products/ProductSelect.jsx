import ProductSelectQuantity from "./ProductSelectQuantity";
import ProductSelectSize from "./ProductSelectSize";
import ProductSubmitForm from "./ProductSubmitForm";

export default function ProductSelect({ list, name }) {
  console.log(list);
  console.log(name);
  return (
    <form className="flex flex-col mt-4">
      {list[0]?.Size.size && <ProductSelectSize list={list} />}
      {/* <input id={item.sizeId}  type="radio" name={name}/>
            <label htmlFor={item.sizeId}>{item.Size.size}</label> */}
      <ProductSelectQuantity />
      <ProductSubmitForm />
    </form>
  );
}
