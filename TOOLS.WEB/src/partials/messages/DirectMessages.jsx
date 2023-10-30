import React, { useEffect, useState } from 'react';
import { getChats } from '../../shared/services/userService';
import defaultUserLogo from '../../assets/images/channel-01.png';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useNavigate } from 'react-router-dom';

function DirectMessages({
  setMsgSidebarOpen,
  user,
  usersChatSelected,
  setusersChatSelected,
  setChatSelected
}) {
  const [chats, setChats] = useState([]);
  const [connection, setConnection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getChats(navigate, user.tokenJwt, setChats, user.tokenObj.id, true);

    return () => {
      
    };
  }, [usersChatSelected]); 
 
  const startConnection = (conn) => {
    return new Promise((resolve, reject) => {
      conn.start()
        .then(() => {
            console.log('Conectado com SignalR Chats!');
            resolve();
        })
        .catch(error => {
            console.error('Falha ao conectar com SignalR:', error);
            setTimeout(() => startConnection(conn), reconnectDelay);
            reject(error);
        });
    });
  };
    
  useEffect(() => {
    const hubConnectionDirectChatsId = `direct-${user.tokenObj.id}`;
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.BASE_URL}chats?userId=${hubConnectionDirectChatsId}`)
      .withAutomaticReconnect([0, 10, 30, 50, 70, 100])
      .build();
  
    setConnection(newConnection);
  }, []);
  
  useEffect(() => {
    if (connection) {
      startConnection(connection);
      connection.on("ReceiveChats", response => {
        setChats((prev) => [...prev, response]);
      });
    }
  
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  
  }, [connection]);

  function click(event){
    setMsgSidebarOpen(false);
    setusersChatSelected(event.currentTarget.id)
    setChatSelected(event.currentTarget.parentNode.id)
  }
  
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Seus Chats</div>
      <ul className="mb-6">
        {
          chats && chats.map((chat, index) => {
            const userToSendMessage = user.tokenObj.id === chat.firstUser.id ? chat.secondUser : chat.firstUser;
            return (
              <li key={index} id={chat.id} className="-mx-2">
              <button onClick={click}  id={userToSendMessage.id} className={`flex items-center justify-between w-full p-2 my-1 rounded ${usersChatSelected === userToSendMessage.id ? "bg-indigo-100" : "hover:bg-indigo-50"}`}>
                <div className="flex items-center truncate">
                  <img className="w-8 h-8 rounded-full mr-2" src={userToSendMessage?.file?.url ?? defaultUserLogo} width="32" height="32" alt="User 01" />
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