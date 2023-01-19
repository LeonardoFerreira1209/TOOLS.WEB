import React from 'react';

import SettingsSidebar from '../../partials/settings/SettingsSidebar';
import PlansPanel from '../../partials/settings/PlansPanel';

function Plans() {
  return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          {/* Page header */}
          <div className="mb-8">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Account Settings ✨</h1>
          </div>

          {/* Content */}
          <div className="bg-white shadow-lg rounded-sm mb-8">
            <div className="flex flex-col md:flex-row md:-mr-px">
              <SettingsSidebar />
              <PlansPanel />
            </div>
          </div>
        </div>
      </main>
  );
}

export default Plans;