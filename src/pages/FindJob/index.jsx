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
        technologys: [],
        salaryType: null,
        salaryFrom: null,
        salaryTo: null,
        orderBy: null,
    });
    const [pageInfo, setPageInfo] = React.useState({
        page: 1,
        total_page: 1,
    });
    const fetchAllJobs = async () => {
        const res = await projectServices.getAllProject({
            page: 1,
            limit: 10,
            ...dataSearch,
        });
        setPageInfo({
            page: res.result.page,
            total_page: res.result.total_page,
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
                <Jobs pageData={pageData} pageInfo={pageInfo} />
            </div>
        </>
    );
}

export default FindJob;
