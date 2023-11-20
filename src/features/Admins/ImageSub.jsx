import { useDispatch } from "react-redux";
import { setErrorProductImage, setProductImage } from "../../stores/adminSlice";

export default function ImageSub() {
  const dispatch = useDispatch();

  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      e.target.value = null;
      dispatch(
        setErrorProductImage({
          productImageSub: "Plese attach the file",
        })
      );
      dispatch(setProductImage({ file: { productImageSub: "" } })); // incase ever add success file
      return;
    }
    if (!file.type.startsWith("image/")) {
      e.target.value = null;
      dispatch(
        setErrorProductImage({
          productImageSub: "Please attach image file",
        })
      );
      dispatch(setProductImage({ file: { productImageSub: "" } })); // incase ever add success file
      return;
    }
    const maxSize = 5 * 1024 * 1024; //5mb
    if (file.size > maxSize) {
      e.target.value = null;
      dispatch(
        setErrorProductImage({
          productImageSub: "Your image file size is larger than 5mb",
        })
      );
      dispatch(setProductImage({ file: { productImageSub: "" } })); // incase ever add success file
      return;
    }
    dispatch(setErrorProductImage({ productImageSub: "" }));
    dispatch(setProductImage({ file: { productImageSub: file } }));
  };
  return (
    <>
      <input type="file" onChange={handleAddFile} />
    </>
  );
}
