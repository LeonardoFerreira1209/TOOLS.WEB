import React, { useEffect, useRef, useState } from 'react';
import { getChatMessages } from '../../shared/services/userService';
import { HubConnectionBuilder } from '@microsoft/signalr';
import MessagesFooter from './MessagesFooter';
import MessagesBody from './MessagesBody';
import MessageLoading from './MessageLoading';
import gptLogo from '../../assets/images/ChatGPT-Logo-PNG-1.png';
import { useNavigate } from 'react-router-dom';

function ChatContainer({
  usersChatSelected,
  user,
  chatSelected
}) {
  const [chatMessages, setChatMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const startConnection = (conn) => {
    return new Promise((resolve, reject) => {
      conn.start()
        .then(() => {
            console.log('Conectado com SignalR chats!');
            resolve();
        })
        .catch(error => {
            console.error('Falha ao conectar com SignalR:', error);
            reject(error);
        });
    });
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke('SendMessageToChatAsync', user.tokenObj.id, chatSelected, `chat-${chatSelected}`, message);
    } catch (error) {
      console.error(error);
    }
  }
    
  useEffect(() => {
    if(connection) connection.stop();

    const hubChatId = `chat-${user.tokenObj.id}`;
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.BASE_URL}chats?userId=${hubChatId}`)
      .withAutomaticReconnect()
      .build();
  
    setConnection(newConnection);
  }, [chatSelected]);
  
  useEffect(() => {
    if (connection) {
      startConnection(connection).then(() => {
        connection.invoke("JoinGroup", chatSelected);
        console.log(`Usuário conectado ao grupo chat-${chatSelected}`);
      });
      connection.on("ReceberMensagem", response => {
          if(response.chatId === chatSelected)
          {
            response.isChatBot || response.isCancellation 
              ? setMessageLoading(false) 
              : response.hasCommand && !response.isChatBot && setMessageLoading(true);
              
            setChatMessages((prev) => [...prev, response]);
          }
      });
      
      connection.onreconnecting(error => {
        console.log(`Conexão perdida "${error}". Reconectando...`);
      });

      connection.onreconnected(connectionId => {
        console.log(`Conexão estabilizada! "${connectionId}".`);
        connection.invoke("JoinGroup", chatSelected);
        console.log(`Usuário conectado ao grupo chat-${chatSelected}`);
      });
    }
  
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  
  }, [connection]);

  useEffect(() =>{
    chatSelected && getChatMessages(navigate, user.tokenJwt, setChatMessages, chatSelected);
  }, [usersChatSelected]);

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  }
  
  let lastMessageCreatedDate = new Date(0);
  return (
      <>
        <div className="grow px-4 sm:px-6 md:px-5 py-6">
            {
              chatMessages && chatMessages.map((message, index) => {
                const showMessageDate = (getDayOfYear(new Date(message.created)) > getDayOfYear(lastMessageCreatedDate)) || index === 0;
                const myUser = (user.tokenObj.id == message.userId && !message.isChatBot);
                lastMessageCreatedDate = new Date(message.created);

                return (
                  <div key={index}>
                    { 
                      showMessageDate && 
                      <div className="flex justify-center">
                          <div className="inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 bg-white border border-slate-200 rounded-full my-5">
                          { new Date(message.created).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) }
                          </div>
                      </div>
                    }
                    <MessagesBody myUser={myUser} chatMessage={message}/>
                  </div>
              )})
            }
        { messageLoading && <MessageLoading userImage={gptLogo} /> }
        </div>
        <div ref={messagesEndRef}></div>
        <MessagesFooter sendMessage={sendMessage} />
    </>
    );

}

export default ChatContainer;

