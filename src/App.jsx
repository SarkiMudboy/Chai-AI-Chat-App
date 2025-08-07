import { useState } from "react";
import ToggleSideBarButton from "./assets/toggleSideBarButton.svg?react";
import Chai from "./assets/chai.svg?react";
import Search from "./assets/search.svg?react";
import Cog from "./assets/cog.svg?react";
import Link from "./assets/link.svg?react";
import ArrowUp from "./assets/arrowUp.svg?react";
import Cancel from "./assets/cancel.svg?react";
import SearchAction from "./assets/searchLong.svg?react";
import Plus from "./assets/plus.svg?react";
import ToggleSideBarOpen from "./assets/toggleSideBarClose.svg?react";
import DropdownArrow from "./assets/dropdownArrow.svg?react";
import Claude from "./assets/models/claude.svg?react";
import OpenAI from "./assets/models/openai.svg?react";
import Gemini from "./assets/models/gemini.svg?react";

/*
 STATE
prompt text : context
file : context? 
selected model : context?
selected thread: store with other threads?
sidebar visible done this
 */

function SideBar({ isSideBarOpen, toggleSideBar }) {
    // const [sideBarOpen, setSideBarOpen] = useState(true);
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
        // this will be from provider sha
        fullName: "Sarki Ihima",
        avatar: "https://i.imgur.com/MK3eW3As.jpg",
        plan: "Free",
    };

    return (
        <>
            <div
                className={`w-1/5 fixed h-full bg-[#363030] px-5 transform transition-transform duration-300 ease-in-out z-50 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <SideBarHeader
                    open={isSideBarOpen}
                    onSideBarOpen={toggleSideBar}
                />
                <button className="mt-12 w-full h-[32] p-2 font-poppins font-[400] text-base rounded-lg bg-[#7F518A] hover:bg-[#917A96] focus:outline-[0.4px] focus:outline-[#A4A0A0]">
                    New Chat
                </button>
                <button className="inline-flex font-poppins font-medium w-full mt-10 justify-between py-2 px-5 hover:bg-[#5F5050] rounded-[4px]">
                    Search Chats
                    <span>
                        <Search />
                    </span>
                </button>
                <ChatsArea chats={chats} />
                <UserProfileCard user={user} />
            </div>
            {!isSideBarOpen && <QuickActions onToggleSideBar={toggleSideBar} />}
        </>
    );
}

function Action({ children, onClick }) {
    return (
        <span
            className="flex items-center justify-center hover:bg-[#484349] rounded-xl"
            onClick={onClick}
        >
            {children}
        </span>
    );
}

function QuickActions({ onToggleSideBar }) {
    return (
        <div className="fixed top-5 left-5 grid grid-cols-3 w-[138px] h-12 bg-[#2B2B29] rounded-xl">
            <Action onClick={() => onToggleSideBar(true)}>
                <ToggleSideBarOpen />
            </Action>
            <Action>
                <SearchAction />
            </Action>
            <Action>
                <Plus />
            </Action>
        </div>
    );
}

function SideBarHeader({ open, onSideBarOpen }) {
    function handleToogleSideBar() {
        onSideBarOpen(!open);
    }

    return (
        <nav className="flex flex-row items-center justify-between content-center mt-12">
            <span onClick={handleToogleSideBar}>
                <ToggleSideBarButton width={26} height={26} />
            </span>
            <span className="inline-flex items-center space-x-2">
                <span className="font-poor-story text-[29px] font-light">
                    Chai
                </span>
                <Chai />
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
        <div className="flex items-center gap-6 pl-1.5 w-full h-22 hover:bg-[#2B2B29] rounded-[12px] ">
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
                    <Cancel />
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

function SelectModelDropdown({ models }) {
    const [selectedModel, setSelectedModel] = useState(models[0].id);
    const [isOpen, setDropdownOpen] = useState(false);
    const name = models.find((model) => model.id === selectedModel).name;

    function handleToggleDropdown(e) {
        e.preventDefault();
        setDropdownOpen(!isOpen);
    }

    const modelOptions = models.map((model) => {
        return (
            <li key={model.id}>
                <ModelCard
                    id={model.id}
                    name={model.name}
                    desc={model.description}
                    logo={model.logo}
                    isSelected={selectedModel === model.id}
                    onSelect={setSelectedModel}
                />
            </li>
        );
    });
    return (
        <div>
            <button
                className="flex items-center justify-center p-2 w-[200px] h-[33px] rounded-[7px] bg-[#5F5050] border border-[#FBF5F5]"
                onClick={(e) => handleToggleDropdown(e)}
            >
                <span className="w-full font-poppins font-medium text-[15px]">
                    {name}{" "}
                </span>
                <span className="mx-4">
                    <DropdownArrow />
                </span>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 bg-[#30302E] rounded-[7px] max-h-60 overflow-y-auto">
                    {" "}
                    <ul>{modelOptions}</ul>
                </div>
            )}
        </div>
    );
}

function ModelCard({ id, name, desc, logo, isSelected, onSelect }) {
    return (
        <div
            className={`flex items-center w-[300px] h-15 mx-3 my-2.5 ${isSelected ? "bg-[#1E1D1C]" : ""} ${isSelected ? "hover:bg-[#1E1D1C]" : "hover:bg-[#484349]"} rounded-sm`}
            onClick={() => onSelect(id)}
        >
            <div className="flex flex-col w-4/5 m-5 font-normal font-poppins">
                <p className="text-sm">{name}</p>
                <p className="text-[9px]">{desc}</p>
            </div>
            <span className="flex items-center justify-center w-12 h-12">
                {logo}
            </span>
        </div>
    );
}

function PromptTextBox({ prompt, models }) {
    return (
        <div className="w-[671px] h-[140px] bg-[#7A6464] rounded-xl border border-white">
            <form className="flex flex-col w-full h-full" action="">
                <textarea
                    rows="4"
                    cols="50"
                    placeholder="How can I help you today..."
                    className="h-[80%] pl-4 pt-5 font-medium text-[#A4A0A0] text-xl font-poppins outline-none"
                ></textarea>
                <div className="flex m-2 justify-between">
                    <input
                        type="file"
                        className="h-[33px]"
                        style={{ display: "none" }}
                    />
                    <div className="flex gap-2">
                        <SelectModelDropdown models={models} />
                        <button className="flex justify-center items-center mr-1 w-[32px] h-[33px] bg-[#5F5050] rounded-[6px] border border-[#FBF5F5] hover:bg-[#7A6464]">
                            <Link />
                        </button>
                    </div>
                    <button
                        className="flex justify-center items-center mr-1 w-[32px] h-[33px] bg-[#5F5050] rounded-[6px] border border-[#FBF5F5] hover:bg-[#7A6464]"
                        type="submit"
                    >
                        <ArrowUp />
                    </button>
                </div>
            </form>
        </div>
    );
}

function GreetingText({ greeting }) {
    return (
        <p className="font-poppins font-semibold text-3xl -mt-[120px] mb-20">
            {greeting}
        </p>
    );
}

function PromptArea() {
    const [prompt, setPrompt] = useState(null); // might move to context
    // this should be a type containing {prompt: string, file: File | null, selectedModel: Model}

    const models = [
        {
            id: "9933ccd7-82c6-4e63-b0f4-6b7cc2dddc32",
            name: "Claude Sonnet 4",
            description: "Powerful large model for challenging tasks",
            logo: <Claude height={18} width={18} />,
        },
        {
            id: "e047c365-1028-4303-8ea8-08863da3c30e",
            name: "ChatGPT-4o",
            description: "Powerful large model for challenging tasks",
            logo: <OpenAI height={18} width={18} />,
        },
        {
            id: "868566da-9157-4d8a-88a9-a73af2b4693c",
            name: "Gemini-2.5 Flash",
            description: "Powerful large model for challenging tasks",
            logo: <Gemini height={18} width={18} />,
        },
    ];
    return (
        <div className="flex flex-col flex-1 justify-center items-center relative">
            <GreetingText greeting="What's up Sarki" />
            <PromptTextBox models={models} prompt={prompt} />
        </div>
    );
}

function InteractiveChatWindow({ sideBarOpen }) {
    return (
        <div
            className={`flex flex-col bg-[#3D3636] h-full w-full ${sideBarOpen ? "ml-[279px]" : ""} duration-500 ease-in-out`}
        >
            <span className="m-5 flex flex-row-reverse">
                <Cog />
            </span>
            <PromptArea />
        </div>
    );
}

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
