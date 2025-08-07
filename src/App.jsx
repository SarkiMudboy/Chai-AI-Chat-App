import { useState } from "react";
import InteractiveChatWindow from "./Layout/InteractiveChatWindow";
import SideBar from "./Layout/SideBar";

function App() {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    return (
        <div className="w-screen h-screen flex m-0 bg-[#3D3636]">
            <SideBar
                isSideBarOpen={sideBarOpen}
                toggleSideBar={setSideBarOpen}
                isSearchOpen={searchOpen}
                toggleSearch={setSearchOpen}
            />
            <InteractiveChatWindow
                sideBarOpen={sideBarOpen}
                searchWindowOpen={searchOpen}
            />
        </div>
    );
}

export default App;
