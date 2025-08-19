import { useState } from "react";
import Cog from "../assets/cog.svg?react";
import Link from "../assets/link.svg?react";
import ArrowUp from "../assets/arrowUp.svg?react";
import Claude from "../assets/models/claude.svg?react";
import OpenAI from "../assets/models/openai.svg?react";
import Gemini from "../assets/models/gemini.svg?react";
import DropdownArrow from "../assets/dropdownArrow.svg?react";
import SearchWindow from "./SearchWindow";

/*
 state = 'loading'
 --- This happens regardless 
 model picker is disabled 
 file picker is disabled
 prompt text area is disabled
--- loading and
if its a new chat, the chat area will have those tree circle animation (depicting loading state)
 if new chat, skeleton showing a new chat is eminent in the sidebar 
*/

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

function GreetingText({ greeting }) {
    return (
        <p className="font-poppins font-semibold text-3xl -mt-[120px] mb-20">
            {greeting}
        </p>
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

function SelectModelDropdown({ models, options, onChangeModel }) {
    // const [selectedModel, setSelectedModel] = useState(models[0].id);
    const [isOpen, setDropdownOpen] = useState(false);
    const selectedModel = models.find((model) => model.id === options.model);

    function handleToggleDropdown(e) {
        e.preventDefault();
        setDropdownOpen(!isOpen);
    }

    function handleSelectModel(id) {
        onChangeModel({ ...options, model: id });
    }

    const modelList = models.map((model) => {
        return (
            <li key={model.id}>
                <ModelCard
                    id={model.id}
                    name={model.name}
                    desc={model.description}
                    logo={model.logo}
                    isSelected={selectedModel.id === model.id}
                    onSelect={handleSelectModel}
                />
            </li>
        );
    });
    return (
        <div>
            <button
                className="flex items-center justify-center p-2 w-[200px] h-[33px] rounded-[7px] bg-[#5F5050] border border-[#FBF5F5] hover:bg-[#744949] disabled:bg-[#3D3636]"
                onClick={(e) => handleToggleDropdown(e)}
            >
                <span className="w-full font-poppins font-medium text-[15px]">
                    {selectedModel.name}{" "}
                </span>
                <span className="mx-4">
                    <DropdownArrow />
                </span>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 bg-[#30302E] rounded-[7px] max-h-60 overflow-y-auto">
                    {" "}
                    <ul>{modelList}</ul>
                </div>
            )}
        </div>
    );
}

function PromptTextBox({ promptOption, onChangePromptOption, models }) {
    function handleChangePrompt(e) {
        onChangePromptOption({ ...promptOption, prompt: e.target.value });
    }
    return (
        <>
            <div className="w-[671px] h-[140px] bg-[#7A6464] rounded-xl border border-white">
                <form className="flex flex-col w-full h-full" action="">
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="How can I help you today..."
                        value={promptOption.prompt}
                        onChange={(e) => handleChangePrompt(e)}
                        className={`h-[80%] pl-4 pt-5 font-medium ${prompt ? "text-white" : "text-[#A4A0A0]"} text-xl font-poppins outline-none disabled:bg-[#484349]`}
                    ></textarea>
                    <div className="flex m-2 justify-between">
                        <input
                            type="file"
                            className="h-[33px]"
                            style={{ display: "none" }}
                        />
                        <div className="flex gap-2">
                            <SelectModelDropdown
                                models={models}
                                options={promptOption}
                                onChangeModel={onChangePromptOption}
                            />
                            <button className="flex justify-center items-center mr-1 w-[32px] h-[33px] bg-[#5F5050] rounded-[6px] border border-[#FBF5F5] hover:bg-[#744949] disabled:bg-[#3D3636]">
                                <Link />
                            </button>
                        </div>
                        <button
                            disabled={!promptOption.prompt}
                            className="flex justify-center items-center mr-1 w-[32px] h-[33px] bg-[#5F5050] rounded-[6px] border border-[#FBF5F5] hover:bg-[#744949] disabled:bg-[#3D3636]"
                            type="submit"
                        >
                            <ArrowUp />
                        </button>
                    </div>
                </form>
            </div>
            <div
                style={{ display: "none" }}
                className="mt-0 rounded-b-xl h-[140px] w-[671px] border border-white bg-[#484349]"
            ></div>
        </>
    );
}

function PromptArea({ genreratingResponse, toggleGenerating, isNewChat }) {
    // we've drilled enuff abeg lets see how to improve this...
    const [promptOption, setPromptOption] = useState({
        prompt: "",
        model: models[0].id,
    }); // might move to context
    // this should be a type containing {prompt: string, file: File | null, selectedModel: Model}

    return (
        <div className="flex flex-col flex-1 justify-center items-center relative">
            <GreetingText greeting="What's up Sarki" />
            <PromptTextBox
                models={models}
                promptOption={promptOption}
                onChangePromptOption={setPromptOption}
            />
        </div>
    );
}

export default function InteractiveChatWindow({
    currentWindow,
    sideBarOpen,
    generating,
    toggleGenerating,
}) {
    const searchWindowOpen = currentWindow == "search";
    return (
        <div
            className={`flex flex-col bg-[#3D3636] h-full w-full ${sideBarOpen ? "ml-[279px]" : ""} duration-500 ease-in-out`}
        >
            <span className="m-5 flex flex-row-reverse">
                <Cog />
            </span>
            {searchWindowOpen ? (
                <SearchWindow />
            ) : (
                <PromptArea
                    genreratingResponse={generating}
                    toggleGenerating={toggleGenerating}
                />
            )}
        </div>
    );
}
