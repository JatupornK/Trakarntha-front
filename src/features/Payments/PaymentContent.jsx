export default function PaymentContent ({defaultPayment}) {

    return (
        <div>
            {defaultPayment.brand} : **** **** **** {defaultPayment.last4}
        </div>
    )
}