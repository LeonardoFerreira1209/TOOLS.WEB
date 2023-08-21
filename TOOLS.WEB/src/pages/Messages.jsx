import React, { useState, useEffect, useRef } from 'react';

import MessagesSidebar from '../partials/messages/MessagesSidebar';
import MessagesHeader from '../partials/messages/MessagesHeader';
import MessagesBody from '../partials/messages/MessagesBody';
import MessagesFooter from '../partials/messages/MessagesFooter';

function Messages() {

  const contentArea = useRef(null)

  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);

  useEffect(() => {
    // contentArea.current.scrollTop = msgSidebarOpen ? 0 : 99999999;
  }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible

  return (
        <main>
          <div className="relative flex">
            {/* Messages sidebar */}
            <MessagesSidebar msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />

            {/* Messages body */}
            <div className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'}`}>
              <MessagesHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
              <MessagesBody />
              <MessagesFooter />
            </div>
          </div>
        </main>
  );
}

export default Messages;