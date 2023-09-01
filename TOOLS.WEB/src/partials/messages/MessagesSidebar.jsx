import React from 'react';
import DirectMessages from './DirectMessages';
import { getUsers } from '../../shared/services/userService';

import UserImage01 from '../../assets/images/user-32-01.jpg';

function MessagesSidebar({
  msgSidebarOpen,
  setMsgSidebarOpen,
  user,
  users,
  setUsers,
  usersChatSelected,
  setusersChatSelected
}) {
  function onchange(event){
    getUsers(user.tokenJwt, setUsers, event.target.value);
  }
  debugger
  return (
    <div
      id="messages-sidebar"
      className={`absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out ${msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]">
          <div className="px-5 py-4">
            {/* Search form */}
            <form className="relative">
              <label htmlFor="msg-search" className="sr-only">Buscar usuários</label>
              <input id="msg-search" onChange={onchange} className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Buscar usuários..." />
              <button className="absolute inset-0 right-auto group" type="button" aria-label="Buscar">
                <lord-icon
                  src="https://cdn.lordicon.com/osbjlbsb.json"
                  trigger="morph"
                  >
                </lord-icon>
              </button>
            </form>
            <div className="mb-6 shadow-lg mt-4">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-3">{ users && users.length > 0 ? "Usuários" : "" }</div>
              <ul style={{overflow:"auto"}} className="max-h-32">
              {
                  users && users.map((user, index) => (
                    <>
                      <li key={index} className="mt-1 hover:bg-slate-200">
                        <button className="flex items-center justify-between w-full p-2" onClick={() => setMsgSidebarOpen(false)}>
                          <div className="flex items-center truncate">
                            <img className="w-8 h-8 rounded-full mr-2" src={UserImage01} width="32" height="32" alt="User 01" />
                            <div className="truncate">
                              <span className="text-sm font-medium text-slate-800">{user.firstName} {user.lastName}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    </>
                  ))
              }
              </ul>
            </div>
          </div>
          <div className="px-5 py-4">
            <DirectMessages msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} user={user} usersChatSelected={usersChatSelected} setusersChatSelected={setusersChatSelected} />
          </div>
        </div>
    </div>
  );
}

export default MessagesSidebar;
