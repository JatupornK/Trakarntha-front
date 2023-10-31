export default function CartAddressContent({ lastestAddress }) {
  console.log(lastestAddress);
  return (
    <div className="word-normal my-2">
      <div className="flex flex-col gap-0.5">
        <p className="text-lg font-semibold">{lastestAddress[0].addressTitle}</p>
        <p className="text-sm flex gap-3">
          {lastestAddress[0].firstName} {lastestAddress[0].lastName} <span>Tel: {lastestAddress[0].phoneNumber}</span>
        </p>
        <p className="text-sm">{lastestAddress[0].address} {lastestAddress[0].postCode}</p>
      </div>
    </div>
  );
}
