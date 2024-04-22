'use client'
import MainContent from "@/components/chatConsole/MainContent";
import SideBar from "@/components/sidebar/SideBar";   

import { createClient } from '../../utils/supabase/client' 
import { useEffect, useState } from "react";

interface Message {
  userText: string;
  chatBotText: string;
}
interface Chat {
  id: string;
  chat_text: string;
}

export default function Home() { 
  const [chatId, setChatId] = useState<string | null>(null);
  const [allChat, setAllChat] = useState<null | Chat[]>(null);
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const storedIsDark = localStorage.getItem('isDark'); 
    return storedIsDark ? JSON.parse(storedIsDark) : true;
  });

  const supabase = createClient();

  useEffect(()=>{
      const getChat = async () => { 
        const supabase = createClient();
        const userData = await supabase.auth.getUser();  
        if (userData?.data?.user) { 
            try {
                const { data: chatData, error: chatError } = await supabase
                  .from("chats")
                  .select("id, chat_text, created_at")
                  .eq('user_id', userData.data.user?.id)
                  .order("created_at", { ascending: false });  

                if (chatError) {
                    throw new Error(`Error fetching chat data: ${chatError.message}`);
                }
    
                if (chatData) {
                    setAllChat(chatData);  
                }
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        }
    }
    getChat();

    const fetchMessages = async () => {
      if (!chatId){
        setAllMessage([]);
        return;
      }  
      try {
        const userData = await supabase.auth.getUser()   
        const { data: messages, error } = await supabase
          .from('messages')
          .select('message_text, reply_text')
          .eq('sender_id', userData.data.user?.id) 
          .eq('chat_id', chatId);

        if (error) {
          throw new Error(`Error fetching messages: ${error.message}`);
        }

        if (messages) {
          const formattedMessages: Message[] = messages.map((msg: any) => ({
            userText: msg.message_text,
            chatBotText: msg.reply_text,
          }));
          setAllMessage(formattedMessages); 
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }; 
    fetchMessages(); 
  }, [chatId])

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark)); 
  }, [isDark]);

  return (
    <main className={`flex min-h-screen w-screen ${isDark? "dark":""}`}> 
      <SideBar allChat={allChat} setAllChat={setAllChat} chatId={chatId} setChatId={setChatId}/>
      <MainContent chatId={chatId} setChatId={setChatId} allMessage={allMessage} setAllMessage={setAllMessage} isDark={isDark} setIsDark={setIsDark}/>
    </main>
  );
}