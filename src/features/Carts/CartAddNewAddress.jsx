import { useState } from "react"
import Modal from '../../components/Modal'
export default function CartAddNewAddress () {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true)
    }
    return (
        <>
        <div className="flex justify-center items-end gap-1">
            <div className="text-blue-500 underline-offset-2 underline cursor-pointer hover:text-blue-300" onClick={handleClick}>
                Add new address
            </div>
        </div>
        {open && <Modal />}
        </>
    )
}