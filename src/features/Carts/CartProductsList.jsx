import CartProductItem from "./CartProductItem";

export default function CartProductsList() {
  return (
    <>
      <div className="w-full sm:w-4/5 md:w-full md:min-w-o md:min-h-0 md:col-span-6 lg:col-span-4 mb-7 md:py-10 px-7">
        <h3 className="font-bold text-2xl mb-4">Shopping Cart</h3>
        <CartProductItem />
      </div>
    </>
  );
}
