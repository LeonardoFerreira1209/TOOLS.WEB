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
    debugger
    getChats(user.tokenJwt, setChats, user.tokenObj.id)

    return () => {
      
    };
  }, [usersChatSelected]); 

  function click(event){
    setMsgSidebarOpen(false);
    setusersChatSelected(event.currentTarget.id)
  }
  
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Seus Chats</div>
      <ul className="mb-6">
        {
          chats && chats.map((chat) => {
            const userToSendMessage = user.tokenObj.id === chat.firstUser.id ? chat.secondUser : chat.firstUser;
            return (
              <li key={chat.id} className="-mx-2">
              <button onClick={click}  id={userToSendMessage.id} className={`flex items-center justify-between w-full p-2 my-1 rounded ${usersChatSelected === userToSendMessage.id ? "bg-indigo-100" : "hover:bg-indigo-50"}`}>
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