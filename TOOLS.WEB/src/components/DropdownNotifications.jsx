import React, { useState, useRef, useEffect, useContext } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import Transition from '../utils/Transition';
import CardNotifications from './CardNotifications';
import ContextNotify from './store/context/ContextNotify';

function DropdownNotifications({align}) {

  // -- CONSTS
  
  // -- STORE
  //const { notifications, setNotifications } = useContext(ContextNotify);

  const [notifications, setNotifications ] = useState([]);
  //const { setNotificationContext } = useContext(ContextNotify);

  debugger
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // -- SIGNALR
  const [hubCx, setHubCx] = useState(null);
  // -- CONSTS

  // -- CLOSE ON CLICK OUTSIDE
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  // -- CLOSE ON CLICK OUTSIDE
  
  // -- CLOSE ON CLICK IN ESC KEY
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  // -- CLOSE ON CLICK IN ESC KEY
  
  // -- SIGNALR
  useEffect(() => { // HUB CONNECTION.
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7125/notify")
      .withAutomaticReconnect()
      .build()

      setHubCx(newConnection);
  }, []);

  useEffect(() => { // HUB RECEIVER
    if(hubCx)
    {   
        hubCx.start().then(() => {
          hubCx.on("ReceiveMessage", (notify) =>  {
            setNotifications((previous) => previous.concat(notify));
          });

        }).catch(e => console.log('Connection failed: ', e));
    }

  }, [hubCx]);

  function cleanNotify(event) {
    event.preventDefault();

    setNotifications([]);
  }
  // -- SIGNALR

  // -- RETURN
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
                notifications.length > 0 ? (<div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>) : (null)
              }
            </button>

            <Transition
              className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
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
                    notifications.length > 0 ? <button style={{ cursor:"pointer" }} onClick={cleanNotify} className="text-xs font-semibold text-slate-400 text-right uppercase pt-1.5 pb-2 px-4">Limpar tudo</button> : (null)
                  }
                </div>
                <ul id='notifications'>
                  {
                    notifications?.map(notify => {
                      debugger
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
  // -- RETURN
}

export default DropdownNotifications;