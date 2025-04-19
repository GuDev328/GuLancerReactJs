import "react-toastify/dist/ReactToastify.css";
import ControlCommunity from "./components/ControlCommunity";
import Posts from "./NewFeeds";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Group from "./Group";
import MyGroups from "./MyGroups";
import SearchCommunity from "./SearchComunity";
import SettingGroup from "./Group/SettingGroup";
function Community() {
    const isMobile = useSelector((state) => state.screen.isMobile);
    const isLgScreen = useSelector((state) => state.screen.isLgScreen);
    console.log(isLgScreen);
    return (
        <>
            <div className="flex">
                <div className="hidden md:block w-[37vw] lg:w-[320px]">
                    <ControlCommunity />
                </div>
                <div
                    className="flex justify-center w-[100vw] md:w-[63vw]"
                    style={isLgScreen ? { width: "calc(100vw - 320px)" } : {}}
                >
                    <Routes>
                        <Route path="/my-groups" element={<MyGroups />} />
                        <Route
                            path="/search/:keySearch"
                            element={<SearchCommunity />}
                        />
                        <Route path="/" element={<Posts />} />
                        <Route path="/setting-group/:id" element={<SettingGroup />} />
                        <Route path="/:id" element={<Group />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Community;
