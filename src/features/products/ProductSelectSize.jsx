export default function ProductSelectSize({ list }) {
  return (
    <>
      <div className="flex flex-row">
        <label htmlFor="size" className="text-xl mr-3">
          Size :
        </label>
        <select
          name="size"
          id="size"
          className="w-2/12  border border-1 border-gray-500 text-center "
        >
          {list.map((item) => {
            return (
              <option
                key={item.sizeId}
                value={item.Size.size}
                className="hover:bg-gray-300"
              >
                {item.Size.size}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
