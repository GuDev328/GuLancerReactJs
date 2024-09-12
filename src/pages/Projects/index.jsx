import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeNavbar from "../Layout";
import { Button, Chip, Input } from "@material-tailwind/react";
import { Routes, Route } from "react-router-dom";
import ProjectSlideBar from "./ProjectSlideBar";
import DetailProject from "./DetailProject";
import { useLocation } from "react-router-dom";
import CreateProject from "./CreateProject";
function Projects() {
    const location = useLocation();
    if (location.pathname === "/projects/create") return <CreateProject />;
    return (
        <div className="my-4 mx-5 flex justify-around">
            <div className="w-[300px]">
                <ProjectSlideBar />
            </div>
            <div className="" style={{ width: "calc(100vw - 400px)" }}>
                <DetailProject />
            </div>
        </div>
    );
}

export default Projects;
