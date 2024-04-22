'use client'
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  userText: string;
  chatBotText: string;
}

interface SearchBarProps { 
  chatId: string | null;
  setChatId: React.Dispatch<React.SetStateAction<string | null>>;
  allMessage: Message[]; 
  setAllMessage: React.Dispatch<React.SetStateAction<Message[]>>;
}

const PromptInputBar: React.FC<SearchBarProps> = ({allMessage, setAllMessage, chatId, setChatId }) => { 
  const [chatBotText, setChatBotText] = useState<string>("Hello! I'm doing well, thank you. How about you?"); 
  const [ userMessage, setUserMessage] = useState<string>('');
  const supabase = createClient()

  const handleSendMessage = async () => {
    const userData = await supabase.auth.getUser() 
    if(!userData.data.user){
      return
    }
    if (!userMessage.trim()) { 
      return;
    }

    const generatedchatId = chatId || uuidv4();  

    if (!chatId) {
      try { 
        const {error: messageError} = await supabase.from("chats").insert({
          id: generatedchatId,
          user_id: userData.data.user?.id,
          chat_text: userMessage,
          created_at: new Date().toISOString(),
        });

        if (messageError) {
          throw Error;
        }

        setChatId(generatedchatId);  

      } catch (error) {
        console.error("Error saving chat:", error);
      }
    }

    const { error: messageError } = await supabase.from('messages').insert(
         [{ 
            chat_id: generatedchatId,
            sender_id: userData.data.user?.id, 
            message_text: userMessage.trim(),
            reply_text: chatBotText,  
            created_at: new Date().toISOString(),
          },]);

    if (messageError) {
      console.error('Error sending message:', messageError.message);
      return;
    }
    else{
      setAllMessage([...allMessage, {userText: userMessage.trim(), chatBotText: chatBotText.trim()}]) 
      setUserMessage("");
    } 
  };

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }
  const isInputEmpty: boolean = userMessage.trim() === ''; 

  return (
    <div className="w-3/5 relative"> 
        <Input className="border-gray-500 mb-4 min-h-12 max-h-40 text-wrap shadow-sm dark:text-white"  
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        /> 
        <span onClick={isInputEmpty? undefined : handleSendMessage} className={`absolute right-3 bottom-6 rounded-lg p-1 ${isInputEmpty? "dark:bg-gray-500 bg-gray-400":"dark:bg-[#ffffff] bg-black"} hover:cursor-pointer`}> 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black"><path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </span>
    </div>
  )
}

export default PromptInputBar