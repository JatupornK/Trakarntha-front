import { useEffect } from "react";
import AdminContainer from "../features/Admins/AdminContainer";

export default function AdminManageMentPage () {
    useEffect(() => {
        //scroll to 0,0 when page change
        window.scrollTo(0, 0);
        
        //scroll to 0,0 when refresh
        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
          };
      
          window.addEventListener('beforeunload', handleBeforeUnload);
      
          return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };
      }, []);
    return (
            <AdminContainer />
    )
}