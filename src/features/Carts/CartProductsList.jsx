import CartProductItem from "./CartProductItem";

export default function CartProductsList() {
  return (
    <>
      <div className="min-w-o min-h-0 col-span-4 py-10 px-7">
        <h3 className="font-bold text-2xl mb-4">Shopping Cart</h3>
        <CartProductItem />
      </div>
    </>
  );
}
