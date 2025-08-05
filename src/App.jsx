import { useState } from "react";
// import ToggleSideBarButton from "./assets/toggleSideBarButton.svg?react";

/*
 STATE
prompt text : context
file : context? 
selected model : context?
selected thread: store with other threads?
sidebar visible done this
 */

function SideBar() {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    //temp
    const chats = [
        {
            id: "8dfe2fa5-e146-4fdb-95b1-db96e3f4a46ei",
            title: "Neovim LSP Setup for Pylint Ruff on Windows",
            updated: "2025-08-01",
        },
        {
            id: "bb157945-68f8-453e-9e86-a5accd891beb",
            title: "Importing and Exporting Components in React",
            updated: "2025-08-01",
        },
    ];
    const user = {
        fullName: "Sarki Ihima",
        avatar: "https://i.imgur.com/MK3eW3As.jpg",
        plan: "Free",
    };

    return (
        sideBarOpen && (
            <div className="w-1/5 h-full bg-[#363030] px-5">
                <SideBarHeader
                    open={sideBarOpen}
                    onSideBarOpen={setSideBarOpen}
                />
                <button className="mt-12 w-full h-[32] p-2 font-poppins font-[400] text-base rounded-lg bg-[#7F518A] hover:bg-[#905E9B]">
                    New Chat
                </button>
                <button className="inline-flex font-poppins font-medium w-full mt-10 justify-between py-2 px-5 hover:bg-[#5F5050] rounded-[4px]">
                    Search Chats
                    <span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                                fill="white"
                            />
                        </svg>
                    </span>
                </button>
                <ChatsArea chats={chats} />
                <UserProfileCard user={user} />
            </div>
        )
    );
}

function SideBarHeader({ open, onSideBarOpen }) {
    function handleToogleSideBar() {
        onSideBarOpen(!open);
    }

    return (
        <nav className="flex flex-row justify-between content-center mt-12">
            <span onClick={handleToogleSideBar}>
                {/* <ToggleSideBarButton width={37} height={38} /> */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 33 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.16671 0.5H0.083374V19.5H3.16671M13.9584 0.5L4.70837 10L13.9584 19.5L16.1321 17.2517L10.613 11.5833H32.4584V8.41667H10.613L16.1321 2.7325L13.9584 0.5Z"
                        fill="white"
                    />
                </svg>
            </span>
            <span className="inline-flex space-x-2">
                <span className="font-poor-story text-[29px] font-light">
                    Chai
                </span>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-1"
                >
                    <path
                        d="M0 16H16V18H0V16ZM16 5V2H14V5H16ZM16 0C16.6 0 17 0.2 17.4 0.6C17.8 1 18 1.5 18 2V5C18 5.6 17.8 6 17.4 6.4C17 6.8 16.6 7 16 7H14V10C14 11.1 13.6 12 12.8 12.8C12 13.6 11.1 14 10 14H4C2.9 14 2 13.6 1.2 12.8C0.4 12 0 11.1 0 10V0H5V2.4L3.2 3.8C3.1 3.9 3 4.1 3 4.2V8.5C3 8.8 3.2 9 3.5 9H7.5C7.8 9 8 8.8 8 8.5V4.2C8 4 7.9 3.9 7.8 3.8L6 2.4V0H16Z"
                        fill="#D9D9D9"
                    />
                </svg>
            </span>
        </nav>
    );
}

function UserProfileCard({ user }) {
    const avatar = user.avatar ? (
        <img
            className="m-2 w-15 h-15 rounded-[50%] "
            src={user.avatar}
            alt={user.fullName}
        />
    ) : (
        <div>{user.fullName[0]}</div>
    );
    return (
        <div className="flex items-center gap-6 pl-1.5  w-full h-22 hover:bg-[#2B2B29] rounded-[12px] ">
            {avatar}
            <div className="font-poppins">
                <div>{user.fullName}</div>
                <div>{user.plan}</div>
            </div>
        </div>
    );
}

// type Thread = {
//   id: string
//   title: string
//   created: string
//   updated: string
// }

function getRelativeTime({ timestamp }) {
    // use the diff in hours from now() and timestamp
    // use a switch case to return a time context
    return "Today"; // this returns a type = 'Today' | 'Yesterday' | 'This Month' | 'This Year'
}

function TimeContextLabel({ timeContext /* This will be the type above */ }) {
    return (
        <h2 className="font-poppins text-[#B5A5A5] text-[11px] px-5 my-6">
            {timeContext}
        </h2>
    );
}

function SelectChatButton({ id, title, selected, onSelectChat }) {
    // we check if the chat is selected then we highlight the button
    return (
        <>
            <button
                className="flex items-center py-2.5 px-5 w-full hover:bg-[#5F5050] rounded-lg"
                onClick={() => onSelectChat(id)}
            >
                <span className="flex-1 font-poppins text-sm font-medium overflow-hidden text-ellipsis truncate">
                    {title}
                </span>
                <span className="opacity-0 hover:opacity-100 hover:pl-2.5">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="24" height="24" rx="5" fill="#7F518A" />
                        <path
                            d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                            fill="white"
                        />
                    </svg>
                </span>
            </button>
        </>
    );
}

function TimeContextGroup({ contextLabel, chats, selectedChat, onSelectChat }) {
    const chatsButtons = chats.map((chat) => (
        <SelectChatButton
            key={chat.id}
            id={chat.id}
            title={chat.title}
            selected={selectedChat}
            onSelectChat={onSelectChat}
        />
    ));
    return (
        <div>
            <TimeContextLabel timeContext={contextLabel} />
            <div>{chatsButtons}</div>
        </div>
    );
}

function ChatsArea({ chats }) {
    let group = {};
    let contextGroup = [];
    const [selectedChat, setSelectedChat] = useState(chats[0].id); // we are making the assumption that this component owns this state

    chats.forEach((chat) => {
        const timeContext = getRelativeTime(chat.updated);
        group[timeContext] = group[timeContext] || [];
        group[timeContext].push(chat);
    });
    console.log(group);
    Object.entries(group).forEach(([context, threads]) => {
        contextGroup.push(
            <TimeContextGroup
                key={context}
                contextLabel={context}
                chats={threads}
                selectedChat={selectedChat}
                onSelectChat={setSelectedChat}
            />,
        );
    });

    return (
        <div className="h-2/4">
            <h2 className="px-5 my-4 font-poppins text-sm">Chats</h2>
            {contextGroup}
        </div>
    );
}

function ModelCard({ model }) {
    return (
        <>
            <button>{model.name}</button>
            <img src={model.logosrc} alt="logo" />
        </>
    );
}

function PromptTextBox({ prompt, models }) {
    const modelOptions = models.map((model) => (
        <div value={model.id} key={model.id}>
            <ModelCard model={model} />{" "}
        </div>
    ));

    return (
        <div className="w-[671px] h-[140px] bg-[#7A6464] rounded-xl outline-1 outline-offset-2 outline-white">
            <form action="">
                <input type="text" />
                <input type="file" />
                <div
                    value={models[0].id}
                    onSelectModel={(e) => setSelectedModel(e.target.value)}
                >
                    {modelOptions}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

function GreetingText({ greeting }) {
    return (
        <p className="font-poppins font-semibold text-3xl mb-10">{greeting}</p>
    );
}

function PromptArea() {
    const [prompt, setPrompt] = useState(null); // might move to context
    // this should be a type containing {prompt: string, file: File | null, selectedModel: Model}

    const models = [
        {
            id: "9933ccd7-82c6-4e63-b0f4-6b7cc2dddc32",
            name: "Claude 4 Sonnet",
            logosrc: "http://image.com",
        },
    ];
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <GreetingText greeting="Whats's up Sarki" />
            <PromptTextBox models={models} prompt={prompt} />
        </div>
    );
}

function InteractiveChatWindow() {
    return (
        <div className="flex flex-col bg-[#3D3636] h-full w-full">
            <span className="m-5">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                >
                    <path
                        d="M15 9.3C16.6356 9.3 18.2041 9.95321 19.3607 11.1159C20.5172 12.2787 21.1669 13.8557 21.1669 15.5C21.1669 17.1443 20.5172 18.7213 19.3607 19.8841C18.2041 21.0468 16.6356 21.7 15 21.7C13.3644 21.7 11.7959 21.0468 10.6393 19.8841C9.48281 18.7213 8.83308 17.1443 8.83308 15.5C8.83308 13.8557 9.48281 12.2787 10.6393 11.1159C11.7959 9.95321 13.3644 9.3 15 9.3ZM15 12.4C14.1822 12.4 13.3979 12.7266 12.8197 13.308C12.2414 13.8893 11.9165 14.6778 11.9165 15.5C11.9165 16.3222 12.2414 17.1107 12.8197 17.692C13.3979 18.2734 14.1822 18.6 15 18.6C15.8178 18.6 16.6021 18.2734 17.1803 17.692C17.7586 17.1107 18.0835 16.3222 18.0835 15.5C18.0835 14.6778 17.7586 13.8893 17.1803 13.308C16.6021 12.7266 15.8178 12.4 15 12.4ZM11.9165 31C11.5311 31 11.2073 30.721 11.1457 30.349L10.5752 26.2415C9.60395 25.854 8.77141 25.327 7.96971 24.707L4.13081 26.2725C3.79162 26.3965 3.37536 26.2725 3.19035 25.9315L0.106891 20.5685C-0.0935343 20.2275 -0.00103034 19.809 0.291898 19.5765L3.54495 17.0035L3.43703 15.5L3.54495 13.95L0.291898 11.4235C-0.00103034 11.191 -0.0935343 10.7725 0.106891 10.4315L3.19035 5.0685C3.37536 4.7275 3.79162 4.588 4.13081 4.7275L7.96971 6.2775C8.77141 5.673 9.60395 5.146 10.5752 4.7585L11.1457 0.651C11.2073 0.279 11.5311 0 11.9165 0H18.0835C18.4689 0 18.7927 0.279 18.8543 0.651L19.4248 4.7585C20.3961 5.146 21.2286 5.673 22.0303 6.2775L25.8692 4.7275C26.2084 4.588 26.6246 4.7275 26.8096 5.0685L29.8931 10.4315C30.0935 10.7725 30.001 11.191 29.7081 11.4235L26.4551 13.95L26.563 15.5L26.4551 17.05L29.7081 19.5765C30.001 19.809 30.0935 20.2275 29.8931 20.5685L26.8096 25.9315C26.6246 26.2725 26.2084 26.412 25.8692 26.2725L22.0303 24.7225C21.2286 25.327 20.3961 25.854 19.4248 26.2415L18.8543 30.349C18.7927 30.721 18.4689 31 18.0835 31H11.9165ZM13.8437 3.1L13.2733 7.1455C11.4232 7.533 9.78895 8.525 8.60182 9.9045L4.88625 8.2925L3.72996 10.3075L6.98301 12.71C6.36631 14.5235 6.36631 16.492 6.98301 18.29L3.71454 20.708L4.87084 22.723L8.61724 21.111C9.80437 22.475 11.4232 23.467 13.2578 23.839L13.8283 27.9H16.1717L16.7422 23.8545C18.5768 23.467 20.1956 22.475 21.3828 21.111L25.1292 22.723L26.2855 20.708L23.017 18.3055C23.6337 16.492 23.6337 14.5235 23.017 12.71L26.27 10.3075L25.1137 8.2925L21.3982 9.9045C20.211 8.525 18.5768 7.533 16.7267 7.161L16.1563 3.1H13.8437Z"
                        fill="white"
                    />
                </svg>
            </span>
            <PromptArea />
        </div>
    );
}

function App() {
    return (
        <div className="w-screen h-screen flex m-0">
            <SideBar />
            <InteractiveChatWindow />
        </div>
    );
}

export default App;
