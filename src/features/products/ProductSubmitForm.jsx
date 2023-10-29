import ButtonSubmitForm from "../../components/ButtonSubmitForm";
import { AiOutlineHeart } from "react-icons/ai";
export default function ProductSubmitForm({ onClick1,onClick2 }) {
  return (
    <>
      <div className="flex flex-row items-center mt-5">
        <ButtonSubmitForm
          text="Add to cart"
          type="submit"
          onClick={onClick1}
          cName="bg-gray-800 flex-1 p-1 text-xl text-white hover:bg-gray-500 mr-3"
        />
        <div className="border p-0.5 border-red-500 hover:bg-red-100">
          <AiOutlineHeart size={30} color="f26969" />
        </div>
      </div>
      <ButtonSubmitForm
        text="Buy now"
        onClick={onClick2}
        cName="bg-red-600 w-full p-1 text-xl mt-2 text-white hover:bg-red-400"
      />
    </>
  );
}
