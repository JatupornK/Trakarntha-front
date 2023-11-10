export default function AdminHeader ({feature, chooseNew}) {
    return (
        <div className="flex justify-center pt-5">
        <div className="w-full grid grid-flow-col grid-cols-2">
          <div
            id="createProduct"
            onClick={chooseNew}
            className={`mr-3 text-center cursor-pointer font-medium text-xl ${
              !feature ? "text-black" : "text-gray-500"
            } `}
          >
            <p className="text-2xl">Add New Product</p>
            <hr className={`border-2 ${!feature ? "border-black" : ""} mt-1`} />
          </div>
          <div
            id="updateOrder"
            onClick={chooseNew}
            className={`text-center cursor-pointer font-medium text-xl ${
              feature ? "text-black" : "text-gray-500"
            } `}
          >
            <p className="text-2xl">Order Status</p>
            <hr className={`border-2 ${feature ? "border-black" : ""} mt-1`} />
          </div>
        </div>
      </div>
    )
}