import React, { useState } from 'react';

import ProfileSidebar from '../../partials/community/ProfileSidebar';
import ProfileBody from '../../partials/community/ProfileBody';

function Profile() {

  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);

  return (
        <main>
          <div className="relative flex">

            {/* Profile sidebar */}
            <ProfileSidebar profileSidebarOpen={profileSidebarOpen} setProfileSidebarOpen={setProfileSidebarOpen} />

            {/* Profile body */}
            <ProfileBody profileSidebarOpen={profileSidebarOpen} setProfileSidebarOpen={setProfileSidebarOpen} />

          </div>
        </main>
  );
}

export default Profile;