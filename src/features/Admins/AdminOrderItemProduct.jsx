export default function AdminOrderItemProduct({ product }) {
//   console.log(product.Order.User.Membership.MemberType.memberType);
  return (
    <>
      <div className="flex flex-row gap-5 ml-4">
        <h3>- {product.Cart.Product.name}</h3>
        <h3>Size : {product.Cart.Size.size}</h3>
        <h3>Amount : {product.Cart.amount}</h3>
        <h3>
            Price : {product.Cart.sumPrice.toLocaleString()} ฿
        </h3>
      </div>
    </>
  );
}
