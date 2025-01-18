import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import FindJob from "../FindJob";
import Community from "../Community";
import MyProjects from "../Projects";
import FindFreelancer from "../FindFreelancer";
import Group from "../Community/Group";
import ViewProject from "../ViewProject";
import UserWall from "../UserWall";
import EditMyProfile from "../UserWall/EditMyProfile";
function Home() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/find-jobs" element={<FindJob />} />
                <Route path="/find-freelancers" element={<FindFreelancer />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/projects/*" element={<MyProjects />} />
                <Route path="/group" element={<Group />} />
                <Route path="/project/:id" element={<ViewProject />} />
                <Route path="/profile/:id" element={<UserWall />} />
                <Route path="/edit-profile/:id" element={<EditMyProfile />} />
            </Routes>
            <Footer />
        </>
    );
}

export default Home;
