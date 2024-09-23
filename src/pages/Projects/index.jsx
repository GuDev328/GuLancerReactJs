import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import ProjectItem from "@/pages/Projects/components/ProjectItem";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CreateProject from "./CreateProject";
import ListProject from "./ListProject";
import { Routes, Route } from "react-router-dom";
import DetailProject from "./DetailProject";
function Projects() {
    return (
        <Routes>
            <Route path="/create" element={<CreateProject />} />
            <Route path="/detail/:id" element={<DetailProject />} />
            <Route path="/" element={<ListProject />} />
        </Routes>
    );
}

export default Projects;
