import React, { useEffect, useState } from "react";
import Filter from "./components/Filter.jsx";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Freelancers from "./components/Freelancers.jsx";
import searchServices from "@/services/searchServices.js";
function FindFreelancer(props) {
  const isMobile = useSelector((state) => state.screen.isMobile);
  const [pageData, setPageData] = React.useState([]);
  const inputSearch = React.useRef(null);
  const [dataSearch, setDataSearch] = React.useState({
    key: "",
    fields: [],
    technologies: [],
    salaryType: null,
    salaryFrom: null,
    salaryTo: null,
    orderBy: 0,
    page: 1,
    limit: 10,
    verified: undefined,
  });
  const [pageInfo, setPageInfo] = React.useState({
    page: 1,
    total_page: 10,
    limit: 2,
  });
  const handleSearch = () => {
    setDataSearch({
      ...dataSearch,
      key: inputSearch.current.value,
    });
  };

  const fetchFreelancer = async () => {
    const res = await searchServices.searchFreelancer(dataSearch);
    setPageInfo({
      page: res.result.page,
      total_page: res.result.total_page,
      limit: res.result.limit,
    });
    setPageData(res.result.data);
  };
  useEffect(() => {
    fetchFreelancer();
  }, [dataSearch]);
  return (
    <div className="flex justify-around">
      <Filter setDataSearch={setDataSearch} dataSearch={dataSearch} />
      <div
        className=""
        style={{ width: isMobile ? "95%" : "calc(95% - 294px)" }}
      >
        <div className="bg-main my-8 p-4 rounded-2xl w-[100%]">
          <p className="font-semibold text-[20px] ml-10 mb-3 text-white">
            Tìm Freelancer cho dự án của bạn
          </p>
          <div className="flex  justify-center ">
            <div className="min-w-[80%] !relative">
              <input
                ref={inputSearch}
                className=" border  min-w-[100%] h-12 pl-14 text-[12px] text-medium border-gray-300 rounded-md bg-white  "
                placeholder="Tìm theo tên, username hoặc công nghệ, lĩnh vực"
              />
              <i className=" !absolute text-[25px] left-3 top-[11px] fa-regular text-main fa-magnifying-glass mr-2"></i>
            </div>

            <Button
              color="blue"
              onClick={handleSearch}
              buttonType="filled"
              className=" w-[125px] ml-2 h-12 font-bold"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>

        <Freelancers
          pageData={pageData}
          pageInfo={pageInfo}
          setDataSearch={setDataSearch}
          setPageInfo={setPageInfo}
          dataSearch={dataSearch}
        />
      </div>
    </div>
  );
}

export default FindFreelancer;
