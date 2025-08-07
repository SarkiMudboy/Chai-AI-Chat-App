import Search from "../assets/search.svg?react";

function ThreadSearchItem({ chat }) {
    return (
        <div className="flex justify-between mt-8 ml-2 w-3xl h-[75px] rounded-xl hover:border-[0.3px] hover:border-[#A69191]">
            <span className="">Hey 1</span>
            <div className="flex flex-col">
                <p>Title Here</p>
                <p>Updated Here</p>
            </div>
            <span className="rows-span-2">Hey-4</span>
        </div>
    );
}

export default function ({ chats }) {
    const localChats = [{ title: "Bicycle Repair Shop Receipt" }];
    const searchItems = localChats.map((chat) => (
        <li>
            <ThreadSearchItem chat={chat} />
        </li>
    ));

    return (
        <div className="p-5 mt-6 ml-[214.4px] w-[800px]">
            <h4 className="font-semibold text-2xl font-poppins">
                Thread History
            </h4>
            <div className="flex items-center justify-center bg-[#484349] mt-8 w-3xl h-[75px] rounded-xl border-[0.4px] border-[#B5A5A5]">
                <input
                    className="w-full py-4 pl-16 pr-4 font-poppins font-meduim text-xl text-white outline-none"
                    placeholder="Search Threads..."
                    type="text"
                />
            </div>
            <span className="relative -top-12 left-6">
                <Search />
            </span>
            <p className="font-poppins font-semibold text-xs ml-6">
                {localChats.length} total chats
            </p>
            <ul>{searchItems}</ul>
        </div>
    );
}
