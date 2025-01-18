import "react-toastify/dist/ReactToastify.css";

import Filter from "./components/Filter";
import React, { Fragment, useEffect } from "react";
import Banner from "./components/Banner";
import Jobs from "./components/Jobs";
import projectServices from "../../services/projectServices";

function FindJob() {
  const [pageData, setPageData] = React.useState([]);
  const [dataSearch, setDataSearch] = React.useState({
    key: "",
    fields: [],
    technologies: [],
    salaryType: null,
    salaryFrom: null,
    salaryTo: null,
    orderBy: 0,
  });
  const [pageInfo, setPageInfo] = React.useState({
    page: 1,
    total_page: 10,
    limit: 10,
  });
  const fetchAllJobs = async () => {
    const res = await projectServices.getAllProject({
      page: pageInfo.page,
      limit: pageInfo.limit,
      ...dataSearch,
    });
    setPageInfo({
      page: res.result.page,
      total_page: res.result.total_page,
      limit: res.result.limit,
    });
    setPageData(res.result.data);
  };
  useEffect(() => {
    fetchAllJobs();
  }, [dataSearch]);

  return (
    <>
      <Banner setDataSearch={setDataSearch} />
      <div className="flex">
        <Filter setDataSearch={setDataSearch} />
        <Jobs
          pageData={pageData}
          pageInfo={pageInfo}
          setDataSearch={setDataSearch}
        />
      </div>
    </>
  );
}

export default FindJob;
