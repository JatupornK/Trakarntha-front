import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import CartModalChooseAddress from "./CartModalChooseAddress";
import CartModalContent from "./CartModalContent";
import CartModalAddNewAddress from "./CartModalAddNewAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAddress,
  setEditAddressId,
  setInputCreateAddress,
} from "../../stores/userSlice";
import useLoading from "../../hooks/useLoading";
import * as userApi from '../../apis/user-api';

export default function CartChangeAddress({ address }) {
  const [isOpen, setIsOpen] = useState(false); //choose new one
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const { userProfile, newSelectedAddressId } = useSelector(
    (state) => state.user
  );
  const {startLoading, stopLoading} = useLoading();
  const dispatch = useDispatch();
  console.log(newSelectedAddressId);
  let div = document.querySelector("body");
  useEffect(() => {
    div.style.overflowY = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleOnclose = () => {
    div.style.overflowY = "unset";
    setIsOpen(false);
  };

  const handleClickEdit = (id) => {
    setIsSecondOpen(true);
    let editAddress = userProfile.Addresses.filter((item) => item.id === id);
    dispatch(
      setInputCreateAddress({
        addressTitle: editAddress[0].addressTitle,
        firstName: editAddress[0].firstName,
        lastName: editAddress[0].lastName,
        address: editAddress[0].address,
        postCode: editAddress[0].postCode,
        phoneNumber: editAddress[0].phoneNumber,
      })
    );
    dispatch(setEditAddressId({ id }));
  };
console.log(userProfile)
  const handleClickDelete = async(id) => {
    try{
      startLoading();
      let res;
      if(userProfile.Addresses.length>1){
        res = await userApi.deleteAddress({id,isLastOne: false});
      }else{
        res = await userApi.deleteAddress({id,isLastOne:true})
      }
      console.log(res)
      if(res.status===201){
        dispatch(editUserProfileAddress({type:'delete',id,lastestId: res.data.id}))
      }
      console.log(res)
      setIsOpen(false);
    }catch(err){
      alert(err);
    }finally{
      stopLoading();
    }
  }
  return (
    <>
      <div className="flex justify-center items-center gap-1">
        <div
          onClick={() => setIsOpen(true)}
          className="text-blue-500 underline-offset-2 underline cursor-pointer hover:text-blue-300"
        >
          Change Address
        </div>
      </div>
      {isOpen && (
        <Modal isSecondOpen={isSecondOpen} style={{ width: "500px" }}>
          <CartModalChooseAddress
            onClose={handleOnclose}
            address={address}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
          />
          {isSecondOpen && (
            <CartModalContent
              text={"Edit Address"}
              onClose={() => setIsSecondOpen(false)}
            >
              <CartModalAddNewAddress
                edit={true}
                onSuccess={() => {setIsSecondOpen(false),setIsOpen(false)}}
              />
            </CartModalContent>
          )}
        </Modal>
      )}
    </>
  );
}
