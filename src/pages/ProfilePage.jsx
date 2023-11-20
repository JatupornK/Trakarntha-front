import { useEffect } from "react";

export default function ProfilePage () {
    useEffect(() => {
      window.scrollTo(0, 0);
      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
      }, []);
    return <p>profilepage</p>
}