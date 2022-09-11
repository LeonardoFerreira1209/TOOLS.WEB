import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SettingsSidebar from '../../partials/settings/SettingsSidebar';
import UserPanel from '../../partials/settings/UserPanel';
import { useParams } from 'react-router-dom';

function Account() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const personId = useParams("id");

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */} 
      <div className="relative flex flex-col flex-1 no-scrollbar overflow-x-hidden">

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="mb-8">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Configurações ✨</h1>
              </div>
              {/* Content */} 
              <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <SettingsSidebar props={personId} />
                <UserPanel props={personId} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Account;