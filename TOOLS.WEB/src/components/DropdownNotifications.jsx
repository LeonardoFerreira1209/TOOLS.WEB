import React, { useState, useRef, useEffect, useContext } from 'react';
import Transition from '../shared/utils/Transition';
import CardNotifications from './CardNotifications';
import NotifyContext from './store/context/NotifyContext';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useUserProvider } from './store/context/UserContext';
import audio from '../assets/audio/H42VWCD-notification.mp3';

function DropdownNotifications({align}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { user } = useUserProvider();
  const { notifications, setNotifications, setResetNotifications } = useContext(NotifyContext);
  const audioRef = useRef(null);
  const [connection, setConnection] = useState(null);
  const reconnectDelay = 5000;
  const playNotificationSound = () => {
      audioRef.current.play();
  };

 useEffect(() => {
  if(notifications === null | undefined) {
    setNotifications([]);
  } 
 }, []);

const startConnection = (conn) => {
  return new Promise((resolve, reject) => {
    conn.start()
      .then(() => {
          console.log('Conectado com SignalR!');
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
  const newConnection = new HubConnectionBuilder()
    .withUrl(`${process.env.BASE_URL}notifications?userId=${user.tokenObj.id}`)
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .build();

  setConnection(newConnection);
}, []);

useEffect(() => {
  if (connection) {
    connection.on("ReceberMensagem", response => {
      setNotifications((prev) => [...prev, {
        id: response.id,
        description: response.typeDescription,
        message: response.message,
        date: new Date(response.createdDate).toLocaleString(),
        type: response.type
      }]);
      playNotificationSound([]);
    });

    connection.onclose(error => {
      console.error('Conexão com SignalR fechada:', error);
      setTimeout(() => startConnection(connection), reconnectDelay);
      reject(error);
    });

    startConnection(connection).then(() => {
      connection.invoke("SendNotificationAsync", "arg2", null)
        .then(() => {
          console.log("Método invocado com sucesso!");
        })
        .catch(err => {
          console.error("Erro ao invocar o método no Hub:", err);
        });
    });
  }

  return () => {
    if (connection) {
      connection.stop();
    }
  };

}, [connection]);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    }; document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.BASE_URL}notifications?userId=${user.tokenObj.id}`).build();
    setConnection(newConnection);
  }, []);

  function cleanNotify() {
    setResetNotifications([]);
  }

  return (
    <NotifyContext.Consumer>
      {
        notifyContext => (
          <div className="relative inline-flex">
            <audio ref={audioRef}>
                <source src={audio} type="audio/mpeg" />
            </audio>
            <button
              ref={trigger}
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${dropdownOpen && 'bg-slate-200'}`}
              aria-haspopup="true"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <span className="sr-only">Notificações</span>
              <lord-icon
                  src="https://cdn.lordicon.com/ujkjgorh.json"
                  trigger="hover"
                  style={{ with: "80%" }}
                  >
              </lord-icon>
              {
                notifyContext.notifications && notifyContext.notifications.length > 0 && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
              }
            </button>

            <Transition
              className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
              show={dropdownOpen}
              enter="transition ease-out duration-200 transform"
              enterStart="opacity-0 -translate-y-2"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <div style={{overflow: "auto"}} className="max-h-80"
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
              >
              <div className='grid grid-cols-2'>
              <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Notificações</div>
                {
                  notifyContext.notifications && notifyContext.notifications.length > 0 && <button style={{ cursor:"pointer" }} onClick={cleanNotify} className="text-xs font-semibold text-slate-400 text-right uppercase pt-1.5 pb-2 px-4">Limpar tudo</button>
                }
              </div>
                <ul id='notifications'>
                  {
                    notifyContext.notifications && notifyContext.notifications.length > 0 && notifyContext.notifications.map((notify, index) => {
                      return (<CardNotifications key={index} id={notify.id} icon={notify.type} date={notify.date.toString("dd-mm-yyyy")} theme={notify.theme} description={notify.description} message={notify.message} />)
                    })
                  }
                </ul>
              </div>
            </Transition>
          </div>
        )
      }
    </NotifyContext.Consumer>
  )
}

export default DropdownNotifications;