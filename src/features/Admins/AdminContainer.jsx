import { useState } from "react";
import AdminHeader from "./AdminHeader";

export default function AdminContainer() {
  const [features, setFeatures] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="container w-full 2xl:w-5/12 xl:w-5/12 lg:w-3/6 md:w-3/5 sm:w-4/5">
        <h1 className="font-bold text-center text-4xl mb-4 mt-8">
          Admin Management
        </h1>
        <AdminHeader
          feature={features}
          chooseNew={() => setFeatures(!features)}
        />
      </div>
    </div>
  );
}
