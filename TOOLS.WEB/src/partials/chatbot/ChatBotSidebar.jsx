import React from 'react';
import HistoryChatBot from './HistoryChatBot';

function ChatBotSidebar({
  msgSidebarOpen,
  setMsgSidebarOpen
}) {
  return (
    <div
      id="messages-sidebar"
      className={`absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out ${msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]">
        <div>
          <div className="px-5 py-4">
            <form className="relative">
              <label htmlFor="msg-search" className="sr-only">Buscar</label>
              <input id="msg-search" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Buscar..." />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Buscar">
                <lord-icon
                  src="https://cdn.lordicon.com/osbjlbsb.json"
                  trigger="morph"
                  >
                </lord-icon>
              </button>
            </form>
            <HistoryChatBot msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBotSidebar;
