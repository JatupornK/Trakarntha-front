import CartOrderSummary from "./CartOrderSummary";
import CartProductsList from "./CartProductsList";

export default function CartContainer() {
  return (
    <div className="container flex flex-row justify-center min-w-full">
      <div className="grid grid-flow-col grid-cols-6 w-full max-w-5xl">
        <CartProductsList />
        <CartOrderSummary />
      </div>
    </div>
  );
}
