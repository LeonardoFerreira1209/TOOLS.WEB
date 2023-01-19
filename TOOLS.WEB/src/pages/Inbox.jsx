import React, { useState } from 'react';

import InboxSidebar from '../partials/inbox/InboxSidebar';
import InboxBody from '../partials/inbox/InboxBody';

function Inbox() {
  const [inboxSidebarOpen, setInboxSidebarOpen] = useState(false);

  return (
        <main>
          <div className="relative flex">

            {/* Inbox sidebar */}
            <InboxSidebar inboxSidebarOpen={inboxSidebarOpen} setInboxSidebarOpen={setInboxSidebarOpen} />

            {/* Inbox body */}
            <InboxBody inboxSidebarOpen={inboxSidebarOpen} setInboxSidebarOpen={setInboxSidebarOpen} />

          </div>
        </main>
  );
}

export default Inbox;