import { useEffect } from "react";

export default function MainPage() {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);

  return (
    <>
      main page
    </>
  );
}
