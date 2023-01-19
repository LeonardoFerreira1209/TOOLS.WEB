import React from 'react';
import ChannelMenu from './ChannelMenu';
import DirectMessages from './DirectMessages';
import Channels from './Channels';

function MessagesSidebar({
  msgSidebarOpen,
  setMsgSidebarOpen
}) {
  return (
    <div
      id="messages-sidebar"
      className={`absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out ${msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]">

        {/* #Marketing group */}
        <div>
          {/* Group header */}
          <div className="sticky top-0 z-10">
            <div className="flex items-center bg-white border-b border-slate-200 px-5 h-16">
              <div className="w-full flex items-center justify-between">
                {/* Channel menu */}
                <ChannelMenu />
                {/* Edit button */}
                <button className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
                  <svg className="w-4 h-4 fill-current text-slate-500" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Group body */}
          <div className="px-5 py-4">
            {/* Search form */}
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
            {/* Direct messages */}
            <DirectMessages msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
            {/* Channels */}
            <Channels msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesSidebar;
