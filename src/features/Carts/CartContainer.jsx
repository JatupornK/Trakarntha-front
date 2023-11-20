import CartOrderSummary from "./CartOrderSummary";
import CartProductsList from "./CartProductsList";

export default function CartContainer() {
  return (
    <div className="container flex flex-col md:flex-row justify-center min-w-full">
      <div className="flex items-center md:items-start flex-col md:grid md:grid-flow-col md:grid-cols-10 lg:grid-cols-6 w-full max-w-5xl">
        <CartProductsList />
        <CartOrderSummary />
      </div>
    </div>
  );
}
