import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utills/localStorage";
// import { useState } from "react";

export default function RedirerctIfNotAdmin ({children}) {
    const {userProfile} = useSelector(state=> state.user);
    // const [loading, setLoading] = useState(true);
    console.log('eiei')
    if(getAccessToken()) { // ถ้าไม่เช็คจาก token จะ error ตอนโหลดหน้า admin จะโดน redirect to all-product เพราะ fetch data ใหม่ทุกรอบที่กด refresh
        console.log(userProfile)
        // const waitFetchUserData = async()=>{
            // await setTimeout(()=>{setLoading(false)},1000)
            if(userProfile?.role!=='admin') {
                console.log('kei')
                return <Navigate to={'/all-products'} />
            }}
        // }
        // waitFetchUserData()
        // return !loading && children
    return children
}