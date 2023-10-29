import CartProductItem from "./CartProductItem";

export default function CartProductsList() {
  return (
    <>
      <div className="min-w-o min-h-0 col-span-4 py-10 px-7">
        <h3 className="font-bold text-2xl mb-4">Shopping Cart</h3>
        {/* <hr className="w-full border-gray border-1 mt-2"></hr> */}
        <CartProductItem />
      </div>
    </>
  );
}
