import "react-toastify/dist/ReactToastify.css";
import ControlCommunity from "./components/ControlCommunity";
import Posts from "./components/Posts";
import { useSelector } from "react-redux";

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
                    <Posts />
                </div>
            </div>
        </>
    );
}

export default Community;
