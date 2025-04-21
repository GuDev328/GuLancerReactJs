import "react-toastify/dist/ReactToastify.css";
import React from "react";
import CreateProject from "./CreateProject";
import ListProject from "./ListProject";
import { Routes, Route } from "react-router-dom";
import DetailProject from "./DetailProject";
function Projects() {
  return (
    <Routes>
      <Route path="/create" element={<CreateProject />} />
      <Route path="/update/:id" element={<CreateProject />} />
      <Route path="/detail/:id" element={<DetailProject />} />
      <Route path="/" element={<ListProject />} />
    </Routes>
  );
}

export default Projects;
