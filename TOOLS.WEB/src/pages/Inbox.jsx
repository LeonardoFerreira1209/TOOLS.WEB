import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import InboxSidebar from '../partials/inbox/InboxSidebar';
import InboxBody from '../partials/inbox/InboxBody';

function Inbox() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inboxSidebarOpen, setInboxSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */} 
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="relative flex">

            {/* Inbox sidebar */}
            <InboxSidebar inboxSidebarOpen={inboxSidebarOpen} setInboxSidebarOpen={setInboxSidebarOpen} />

            {/* Inbox body */}
            <InboxBody inboxSidebarOpen={inboxSidebarOpen} setInboxSidebarOpen={setInboxSidebarOpen} />

          </div>
        </main>

      </div>
      
    </div>
  );
}

export default Inbox;