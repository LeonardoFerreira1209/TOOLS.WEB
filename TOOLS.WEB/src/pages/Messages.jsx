import React, { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import MessagesSidebar from '../partials/messages/MessagesSidebar';
import MessagesHeader from '../partials/messages/MessagesHeader';
import MessagesBody from '../partials/messages/MessagesBody';
import { useUserProvider } from '../components/store/context/UserContext';

function Messages() {
  const contentArea = useRef(null)
  
  const { user } = useUserProvider();
  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersChatSelected, setusersChatSelected] = useState(null);
  const [chatSelected, setChatSelected] = useState(null);

  useEffect(() => {
    contentArea.current.scrollTop = msgSidebarOpen;
  }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible

  return (
    <main>
      <div className="relative flex">
        {/* Messages sidebar */}
        <MessagesSidebar msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} user={user} setUsers={setUsers} users={users} usersChatSelected={usersChatSelected} setusersChatSelected={setusersChatSelected} setChatSelected={setChatSelected} />

        {/* Messages body */}
        <div className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'}`}>
          {/* IziToast */}
          <ToastContainer position="top-right"></ToastContainer>
          <MessagesHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
          { chatSelected && <MessagesBody usersChatSelected={usersChatSelected} user={user} chatSelected={chatSelected} /> }
        </div>
      </div>
      <div ref={contentArea}></div>
    </main>
  );
}

export default Messages;