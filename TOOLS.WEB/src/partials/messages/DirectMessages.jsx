import React, { useContext, useEffect, useState } from 'react';
import { getChats } from '../../shared/services/userService';

import UserImage01 from '../../assets/images/user-32-01.jpg';

function DirectMessages({
  setMsgSidebarOpen,
  user,
  usersChatSelected,
  setusersChatSelected
}) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats(user.tokenJwt, setChats, user.tokenObj.id)
  }, []);

  function click(e){
    debugger
    setMsgSidebarOpen(false);
    setusersChatSelected(e.target.id)
  }
  debugger
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Seus Chats</div>
      <ul className="mb-6">
        {
          chats && chats.map((chat, index) => {
            const userToSendMessage = user.tokenObj.id === chat.firstUser.id ? chat.secondUser : chat.firstUser;
            return (
              <li key={index} className="-mx-2">
              <button onClick={click}  id={userToSendMessage.id} className={`flex items-center justify-between w-full p-2 rounded hover:bg-indigo-100 ${usersChatSelected !== null ? "bg-indigo-100" : ""}`}>
                <div className="flex items-center truncate">
                  <img className="w-8 h-8 rounded-full mr-2" src={UserImage01} width="32" height="32" alt="User 01" />
                  <div className="truncate">
                    <span className="text-sm font-medium text-slate-800">{userToSendMessage.firstName} {userToSendMessage.lastName}</span>
                  </div>
                </div>
                <div className="flex items-center ml-2">
                  <div className="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">2</div>
                </div>
              </button>
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DirectMessages;