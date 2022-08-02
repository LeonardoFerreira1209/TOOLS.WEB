import React, { useState, useRef, useEffect } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import Transition from '../utils/Transition';
import CardNotifications from './CardNotifications';

function DropdownNotifications({align}) {

  //#region  SignalR
  const [hubCx, setHubCx] = useState(null);
  
  const [notifications, setNotifications ] = useState([]);
  
  useEffect(() => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7125/notify")
        .withAutomaticReconnect()
        .build()

        setHubCx(newConnection); 

    }, []);

  useEffect(() => {
    debugger
    // Hub connected...
    if(hubCx)
    {   
        hubCx.start().then(result => {
          console.info("Connected...");
          
          hubCx.on("ReceiveNotification", (notify) => 
          { 
            debugger
            notifications.push(notify); setNotifications(notifications); 
          });
          
        }).catch(e => console.log('Connection failed: ', e));
    }

  }, [hubCx]);
  //#endregion

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
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
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
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
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Notificações</div>
          <ul id='notifications'>
            {
              notifications.map(notify => {
                debugger
                return (<CardNotifications date={notify.date} message={notify.message} />)
              })
            }
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownNotifications;