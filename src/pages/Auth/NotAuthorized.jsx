import React from "react";

export default function NotAuthorized() {
  return (
    <div className="flex bg-white justify-center flex-col items-center h-screen">
      <img src={"/403.jpg"} alt="403" />
      <div className=" text-[#2881e2]">
        Oops! Bạn không có quyền truy cập trang này
      </div>
    </div>
  );
}
