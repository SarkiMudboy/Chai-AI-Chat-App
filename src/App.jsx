import { useState } from "react";
import InteractiveChatWindow from "./Layout/InteractiveChatWindow";
import SideBar from "./Layout/SideBar";

function App() {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [currentWindow, setCurrentWindow] = useState("newChat"); // options: "newChat", "search", "threadId" : uuid type
    const [generating, isGenerating] = useState(false);

    return (
        <div className="w-screen h-screen flex m-0 bg-[#3D3636]">
            <SideBar
                isSideBarOpen={sideBarOpen}
                toggleSideBar={setSideBarOpen}
                currentWindow={currentWindow}
                toggleWindow={setCurrentWindow}
                pendingChat={generating && currentWindow === "newChat"}
            />
            <InteractiveChatWindow
                sideBarOpen={sideBarOpen}
                currentWindow={currentWindow}
                generating={generating}
                toggleGenerating={isGenerating}
            />
        </div>
    );
}

export default App;
