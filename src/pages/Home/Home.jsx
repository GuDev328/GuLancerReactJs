import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import FindJob from "../../pages/FindJob/FindJob";
import Community from "../../pages/Community/Community";
import MyProjects from "../../pages/Projects/Projects";
import FindFreelancer from "../../pages/FindFreelancer/FindFreelancer";
function Home() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/find-jobs" element={<FindJob />} />
                <Route path="/find-freelancers" element={<FindFreelancer />} />
                <Route path="/community" element={<Community />} />
                <Route path="/projects" element={<MyProjects />} />
            </Routes>
            <Footer />
        </>
    );
}

export default Home;
