import { useDispatch } from "react-redux";
import { setErrorProductImage, setProductImage } from "../../stores/adminSlice";

export default function ImageMain() {
  const dispatch = useDispatch();

  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      e.target.value = null;
      dispatch(
        setErrorProductImage({
          productImageMain: "Plese attach the file",
        })
      );
      dispatch(setProductImage({ file: { productImageMain: "" } })); // incase ever add success file
      return;
    }
    if (!file.type.startsWith("image/")) {
      e.target.value = null;
      dispatch(
        setErrorProductImage({
          productImageMain: "Please attach image file",
        })
      );
      dispatch(setProductImage({ file: { productImageMain: "" } }));
      return;
    }
    const maxSize = 5 * 1024 * 1024; //5mb
    if (file.size > maxSize) {
      e.target.value = null;
      dispatch(
        setErrorProductImage({
          productImageMain: "Your image file size is larger than 5mb",
        })
      );
      dispatch(setProductImage({ file: { productImageMain: "" } }));
      return;
    }
    dispatch(setErrorProductImage({ productImageMain: "" }));
    dispatch(setProductImage({ file: { productImageMain: file } }));
  };
  return (
    <>
      <input type="file" onChange={handleAddFile} />
    </>
  );
}
