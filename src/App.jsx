import { useState } from "react";
import InteractiveChatWindow from "./Layout/InteractiveChatWindow";
import SideBar from "./Layout/SideBar";

function App() {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    return (
        <div className="w-screen h-screen flex m-0 bg-[#3D3636]">
            <SideBar
                isSideBarOpen={sideBarOpen}
                toggleSideBar={setSideBarOpen}
            />
            <InteractiveChatWindow sideBarOpen={sideBarOpen} />
        </div>
    );
}

export default App;
