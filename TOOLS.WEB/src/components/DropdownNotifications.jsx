import React, { useState, useRef, useEffect, useContext } from 'react';
import Transition from '../shared/utils/Transition';
import CardNotifications from './CardNotifications';
import ContextNotify from './store/context/ContextNotify';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ContextUser from './store/context/ContextUser';

function DropdownNotifications({align}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { user } = useContext(ContextUser);
  
  debugger
  const { notifications, setNotifications, setResetNotifications } = useContext(ContextNotify);

  if(notifications === null | undefined) {
      setNotifications([]);
  }

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);

    }; document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  });
  
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${process.env.BASE_URL}notifications?userId=${user.tokenObj.id}`)
      .build();

    connection.start()
      .then(() => console.log('Conexão iniciada'))
      .catch(err => console.log('Erro ao iniciar a conexão: ' + err));

    connection.on("ReceberMensagem", response => {
      debugger
      setNotifications((prev) => [...prev, {
        id: response.id,
        theme: response.type,
        message: response.message,
        date: response.createdDate
      }]);
    });

    connection.onclose(() => {
      setTimeout(() => {
        connection.start();
      }, 5000);
    });

    return () => {
      connection.stop();
    };

  }, []);

  function cleanNotify() {
    debugger
    setResetNotifications([]);
  }

  return (
    <ContextNotify.Consumer>
      {
        notifyContext => (
          <div className="relative inline-flex">
            <button
              ref={trigger}
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${dropdownOpen && 'bg-slate-200'}`}
              aria-haspopup="true"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <span className="sr-only">Notificações</span>
              <lord-icon
                  src="https://cdn.lordicon.com/ujkjgorh.json"
                  trigger="hover"
                  >
              </lord-icon>
              {
                notifyContext.notifications && notifyContext.notifications.length > 0 && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
              }
            </button>

            <Transition
              className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 max-h-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-auto mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
              show={dropdownOpen}
              enter="transition ease-out duration-200 transform"
              enterStart="opacity-0 -translate-y-2"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <div
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
                      notifyContext.notifications && notifyContext.notifications.length > 0 && notifyContext.notifications.map(notify => {
                        return (<CardNotifications key={notify.id} id={notify.id} icon={notify.icon} date={notify.date} theme={notify.theme} message={notify.message} />)
                      })
                    }
                  </ul>
              </div>
            </Transition>
          </div>
        )
      }
    </ContextNotify.Consumer>
  )
}

export default DropdownNotifications;