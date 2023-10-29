import CartOrderSummaryContent from "./CartOrderSumaryContent";

export default function CartOrderSummary () {
    return (
        <div className="min-w-o min-h-0 col-span-2 py-10 px-7">
            <h3 className="font-bold text-2xl mb-4">Order Summary</h3>
            <hr className="w-full border-gray border-1 mt-2"></hr>
            <CartOrderSummaryContent />
        </div>
    )
}