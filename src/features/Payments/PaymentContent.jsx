export default function PaymentContent({ defaultPayment }) {
  return (
    <div className="flex flex-row my-2">
      <img
        src={
          defaultPayment.brand === "mastercard"
            ? `/Mastercard_logo.jpg`
            : "/visa_logo.jpg"
        }
        width={30}
        height={30}
      />
      **** **** **** {defaultPayment.last4}
    </div>
  );
}
