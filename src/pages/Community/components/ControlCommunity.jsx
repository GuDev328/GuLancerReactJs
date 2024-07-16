import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Avatar, Button, Chip, Input } from "@material-tailwind/react";

function ControlCommunity() {
    const [keySeachGroup, setKeySeachGroup] = useState("");
    return (
        <>
            <div className="">
                <div className="controlCard bg-white m-3 flex flex-col items-center rounded-lg">
                    <div className="flex w-[100%] justify-between items-center p-5 pb-2">
                        <p className="text-[23px]  font-bold">Cộng đồng</p>
                        <i className="fa-duotone text-main fa-gears text-[27px] "></i>
                    </div>
                    <div className="relative flex w-[90%] max-w-[24rem]">
                        <Input
                            type="text"
                            label="Tìm cộng đồng"
                            value={keySeachGroup}
                            onChange={(e) => setKeySeachGroup(e.target.value)}
                            className="p-5"
                        />
                        <Button
                            size="sm"
                            disabled={!keySeachGroup}
                            className="!absolute right-1 top-1 rounded bg-main"
                        >
                            <i className="fa-light fa-magnifying-glass mr-1"></i>
                            Tìm kiếm
                        </Button>
                    </div>

                    <div className="w-[90%] m-2 rounded-md h-12 bg-[#F0F2F5] flex items-center">
                        <i className="fa-light text-[27px] ml-5 mr-3 fa-newspaper"></i>
                        <p className=" font-bold">Bảng tin</p>
                    </div>

                    <div className="w-[90%] m-2 mt-0 rounded-md h-12 bg-[#F0F2F5] flex items-center">
                        <i className="fa-duotone fa-users text-[23px] ml-5 mr-3"></i>
                        <p className=" font-bold">Nhóm của bạn</p>
                    </div>
                </div>

                <div className="ownerGroup bg-white m-3 flex flex-col items-center rounded-lg">
                    <div className="flex w-[100%] justify-between items-center p-5 pb-2">
                        <p className="text-[23px]  font-bold">
                            Cộng đồng bạn quản lý
                        </p>
                    </div>

                    <div className="w-[90%] m-2 mt-0 rounded-md h-12 py-2 bg-[#F0F2F5] flex items-center">
                        <Avatar
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            className=" mr-3 w-[45px] h-[45px]"
                            alt="avatar"
                            variant="rounded"
                        />
                        <p className="font-medium">Anh em Website Hà Nội</p>
                    </div>
                    <div className="w-[90%] m-2 mt-0 rounded-md h-12 py-2 bg-[#F0F2F5] flex items-center">
                        <Avatar
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            className=" mr-3 w-[45px] h-[45px]"
                            alt="avatar"
                            variant="rounded"
                        />
                        <p className=" font-medium">IT Tám Chuyện</p>
                    </div>
                    <Button className="bg-main mb-2 w-[250px]" size="sm">
                        Tạo mới cộng đồng
                    </Button>
                </div>

                <div className="myGroup bg-white m-3 flex flex-col items-center rounded-lg">
                    <div className="flex w-[100%] justify-between items-center p-5 pb-2">
                        <p className="text-[23px]  font-bold">
                            Cộng đồng đã tham gia
                        </p>
                    </div>

                    <div className="w-[90%] m-2 mt-0 rounded-md h-12 py-2 bg-[#F0F2F5] flex items-center">
                        <Avatar
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            className=" mr-3 w-[45px] h-[45px]"
                            alt="avatar"
                            variant="rounded"
                        />
                        <p className="font-medium">Anh em Website Hà Nội</p>
                    </div>
                    <div className="w-[90%] m-2 mt-0 rounded-md h-12 py-2 bg-[#F0F2F5] flex items-center">
                        <Avatar
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            className=" mr-3 w-[45px] h-[45px]"
                            alt="avatar"
                            variant="rounded"
                        />
                        <p className=" font-medium">IT Tám Chuyện</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ControlCommunity;
