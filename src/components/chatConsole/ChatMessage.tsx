'use clinet'
import React from 'react'
import Markdown from 'react-markdown'

interface ChatMessageProps { 
  userText: string;
  chatBotText: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({userText, chatBotText}) => {
  return (
    <div className='mt-10'>
      <div>
        <div className='flex items-center gap-2'>
          <img className="h-6 w-6 rounded-full" src="https://i.pinimg.com/736x/71/f8/11/71f811a36fdbe4470af6ce0dba53fa25.jpg" alt='User Image'></img>
          <p className='text-base font-semibold'>You</p>
        </div>
        <div>
          <p className='ms-8 text-sm'>{userText}</p>
        </div>
      </div>
      <div className='mt-5'>
        <div className="flex items-center gap-2">
          <svg className="w-[1.3rem] me-[0.15rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="5.000375747680664 8.805000305175781 89.99962615966797 82.38999938964844"><path className="dark:text-white" d="M92.726 17.19c-3.03-5.25-8.46-8.385-14.523-8.385H21.797c-6.063 0-11.492 3.135-14.523 8.385s-3.032 11.52 0 16.77l28.202 48.85c3.032 5.25 8.461 8.385 14.524 8.385 6.063 0 11.493-3.135 14.523-8.385l28.203-48.85c3.032-5.25 3.032-11.519 0-16.77zm-82.438 1.74c2.402-4.16 6.705-6.645 11.509-6.645h31.046c4.398 0 8.195 2.207 10.417 6.055 2.333 4.04 2.32 9.08-.016 13.128l-.6 1H36.153l-.02.033-2.13-.033c-5.736 0-10.866 2.954-13.722 7.901a16.149 16.149 0 0 0-1.995 5.705l-7.998-13.853c-2.403-4.162-2.403-9.13 0-13.29zm39.604 35.593L39.167 35.948h21.449L49.892 54.523zM61.509 81.07c-2.402 4.16-6.704 6.645-11.509 6.645-4.804 0-9.107-2.484-11.51-6.645L23.336 54.82c-2.311-4.001-2.326-8.753-.041-12.71 2.227-3.859 6.23-6.162 10.68-6.162l1.184.019 13.212 22.882 1.058 1.905c2.904 5.029 8.104 8.031 13.91 8.031a16.18 16.18 0 0 0 5.902-1.107L61.509 81.07zm28.203-48.85l-15.47 26.797-.006-.003c-2.274 3.94-6.348 6.291-10.896 6.291s-8.623-2.352-10.882-6.267l-.566-1.019 13.245-22.941 1.106-1.846c2.972-5.145 2.983-11.518.031-16.632a15.778 15.778 0 0 0-3.654-4.315h15.583c4.805 0 9.108 2.484 11.51 6.646 2.402 4.16 2.402 9.129 0 13.29z" fill="currentColor"></path></svg>
          <p className='text-base font-semibold'>ChatBOT</p>
        </div>
        <div>
          {!chatBotText.length ? (<>
            <div className="loader-container">
              <div className="dot bg-black dark:bg-white" />
              <div className="dot bg-black dark:bg-white" />
              <div className="dot bg-black dark:bg-white" />
            </div> 
          </>):(<>
            <div className='ms-8 text-sm'><Markdown>{chatBotText}</Markdown></div> 
          </>)} 
        </div>
        
      </div>
    </div>
  )
}

export default ChatMessage