export default function ProductHover({ isHover }) {
  return (
    <div
      className={`opacity-70 absolute text-center bottom-0 w-full bg-black text-white leading-8 ${
        !isHover && "hidden"
      }`}
    >
      Discover More
    </div>
  );
}
