import React, { useState, useEffect, useRef } from 'react';
import ChatBotFooter from '../partials/chatbot/ChatBotFooter';
import ChatBotBody from '../partials/chatbot/ChatBotBody';
import ChatBotHeader from '../partials/chatbot/ChatBotHeader';
import ChatBotSidebar from '../partials/chatbot/ChatBotSidebar';

function ChatBot() {
  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);
  
  return (
        <main>
          <div className="relative flex">
            {/* Messages sidebar */}
            <ChatBotSidebar msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
            {/* Messages body */}
            <div className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'}`}>
              <ChatBotHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
              <ChatBotBody />
              <ChatBotFooter />
            </div>
          </div>
        </main>
  );
}

export default ChatBot;