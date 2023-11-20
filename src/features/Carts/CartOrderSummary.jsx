import CartOrderSummaryContent from "./CartOrderSumaryContent";

export default function CartOrderSummary () {
    return (
        <div className="w-full sm:w-4/5 md:w-full md:min-w-o md:min-h-0 col-span-4 lg:col-span-2 pt-0 pb-5 md:py-10 px-7">
            <h3 className="font-bold text-2xl mb-4">Order Summary</h3>
            <hr className="w-full border-gray border-1 mt-2"></hr>
            <CartOrderSummaryContent />
        </div>
    )
}