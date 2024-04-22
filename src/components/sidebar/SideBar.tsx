'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import Image from "next/image";
import threeDot from "/public/images/threedot.svg";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

interface Chat {
    id: string;
    chat_text: string;
}
interface SideBarProps {
    allChat: Chat[] | null; 
    setAllChat: React.Dispatch<React.SetStateAction<Chat[] | null>>; 
    chatId: string | null;  
    setChatId: React.Dispatch<React.SetStateAction<string | null>>;
}

const SideBar: React.FC<SideBarProps> = ({ allChat, setAllChat, chatId, setChatId }) => { 
    const supabase = createClient();

    const deleteChatItem = async (chatIdToDelete: string) => {
        try {
            const { data, error } = await supabase
                .from("chats")
                .delete()
                .eq("id", chatIdToDelete);

            if (error) {
                throw new Error(`Error deleting chat item: ${error.message}`);
            }
 
            const updatedChatList = allChat?.filter(chat => chat.id !== chatIdToDelete);
            setAllChat(updatedChatList || []); 
            if(chatIdToDelete===chatId) setChatId(null);
            else setChatId(chatId);
        } catch (error) {
            console.error("Error deleting chat item:", error);
        }
    };


    
  return (
    <div className="min-w-72 max-w-72 h-screen dark:bg-[#141414] light:bg-red-500 flex flex-col bg-[#ECF2FF] dark:text-white">  
        <ScrollArea className="flex-grow overflow-y-auto px-3"> 
        <div className="sticky top-0 pt-3 pb-1 dark:bg-[#141414] mb-4 ">
            <div className="py-[0.45rem] ps-2 hover:bg-slate-300 hover:dark:bg-[#2b2a2a] hover:cursor-pointer me-2 rounded-lg flex justify-between"
                onClick={() => setChatId(null)}>
                <div className="flex gap-2 items-center">
                    <div className="border border-gray-500 rounded-full p-[0.2rem]">
                        <svg className="w-[1.2rem] h-[1.2rem] pt-[0.1rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="5.000375747680664 8.805000305175781 89.99962615966797 82.38999938964844"><path className="dark:text-white" d="M92.726 17.19c-3.03-5.25-8.46-8.385-14.523-8.385H21.797c-6.063 0-11.492 3.135-14.523 8.385s-3.032 11.52 0 16.77l28.202 48.85c3.032 5.25 8.461 8.385 14.524 8.385 6.063 0 11.493-3.135 14.523-8.385l28.203-48.85c3.032-5.25 3.032-11.519 0-16.77zm-82.438 1.74c2.402-4.16 6.705-6.645 11.509-6.645h31.046c4.398 0 8.195 2.207 10.417 6.055 2.333 4.04 2.32 9.08-.016 13.128l-.6 1H36.153l-.02.033-2.13-.033c-5.736 0-10.866 2.954-13.722 7.901a16.149 16.149 0 0 0-1.995 5.705l-7.998-13.853c-2.403-4.162-2.403-9.13 0-13.29zm39.604 35.593L39.167 35.948h21.449L49.892 54.523zM61.509 81.07c-2.402 4.16-6.704 6.645-11.509 6.645-4.804 0-9.107-2.484-11.51-6.645L23.336 54.82c-2.311-4.001-2.326-8.753-.041-12.71 2.227-3.859 6.23-6.162 10.68-6.162l1.184.019 13.212 22.882 1.058 1.905c2.904 5.029 8.104 8.031 13.91 8.031a16.18 16.18 0 0 0 5.902-1.107L61.509 81.07zm28.203-48.85l-15.47 26.797-.006-.003c-2.274 3.94-6.348 6.291-10.896 6.291s-8.623-2.352-10.882-6.267l-.566-1.019 13.245-22.941 1.106-1.846c2.972-5.145 2.983-11.518.031-16.632a15.778 15.778 0 0 0-3.654-4.315h15.583c4.805 0 9.108 2.484 11.51 6.646 2.402 4.16 2.402 9.129 0 13.29z" fill="currentColor"></path></svg>
                    </div>
                    <p className="text-sm font-semibold">New chat</p>
                </div>
                <div className="pe-2 flex items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon-md w-5"><path fillRule="evenodd" clipRule="evenodd" d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z"></path></svg>
                </div>
            </div>
        </div> 
        {allChat?.map((chatItem: Chat, index: number) => (
        <div key={chatItem.id} className={`hover:dark:bg-[#2b2a2a] hover:bg-slate-300 flex items-center hover:cursor-pointer rounded-lg w-64 mt-[0.1rem] ${
            chatItem.id === chatId ? "dark:bg-[#2b2a2a] bg-slate-300" : "" }`}
            >
            <p className="text-sm overflow-hidden py-2 ps-3 w-full rounded-lg" onClick={() => setChatId(chatItem.id)}> {chatItem.chat_text} </p>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div onClick={() => deleteChatItem(chatItem.id)} className="h-fit w-fit"> 
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`icon-md me-1 my-2 text-red-`}><path fillRule="evenodd" clipRule="evenodd" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" fill="currentColor"></path></svg>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>    
                    <p>Delete Chat</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        ))}
        </ScrollArea>
        <div className="w-64">
            <Profile/>
        </div>
        
    </div>
  )
}

export default SideBar;