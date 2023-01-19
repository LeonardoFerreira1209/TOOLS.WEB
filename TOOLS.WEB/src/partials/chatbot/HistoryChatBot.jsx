import React from 'react';

import UserImage01 from '../../images/user-32-01.jpg';

function HistoryChatBot() {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Mensagens salvas</div>
      <ul className="mb-6">
        {/* <li className="-mx-2">
          <button className="flex items-center justify-between w-full p-2 rounded bg-indigo-100" onClick={() => setMsgSidebarOpen(false)}>
            <div className="flex items-center truncate">
              <img className="w-8 h-8 rounded-full mr-2" src={UserImage01} width="32" height="32" alt="User 01" />
              <div className="truncate">
                <span className="text-sm font-medium text-slate-800">Dominik Lamakani</span>
              </div>
            </div>
            <div className="flex items-center ml-2">
              <div className="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">2</div>
            </div>
          </button>
        </li> */}
      </ul>
    </div>
  )
}

export default HistoryChatBot;