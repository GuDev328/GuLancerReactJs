import "react-toastify/dist/ReactToastify.css";

import Filter from "./components/Filter";
import { Fragment } from "react";
import Banner from "./components/Banner";
import Jobs from "./components/Jobs";

function FindJob() {
    return (
        <>
            <Banner />
            <div className="flex">
                <Filter />
                <Jobs />
            </div>
        </>
    );
}

export default FindJob;
