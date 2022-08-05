import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ForumLeftContent from '../../partials/community/ForumLeftContent';
import ForumEntries from '../../partials/community/ForumEntries';
import ForumRightContent from '../../partials/community/ForumRightContent';

import Avatar from '../../images/user-40-02.jpg';

function Forum() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 no-scrollbar overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-9xl mx-auto">

            <div className="xl:flex">

              {/* Left + Middle content */}
              <div className="md:flex flex-1">

                {/* Left content */}
                <ForumLeftContent />

                {/* Middle content */}
                <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
                  <div className="md:py-8">

                    {/* Buttons group */}
                    <div className="mb-4">
                      <div className="w-full flex flex-wrap -space-x-px">
                        <button className="btn grow bg-white border-slate-200 color-primary rounded-none first:rounded-l last:rounded-r">Popular</button>
                        <button className="btn grow bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r">Newest</button>
                        <button className="btn grow bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r">Following</button>
                      </div>
                    </div>

                    {/* Forum Entries */}
                    <div className="space-y-2">
                      <ForumEntries />
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 text-right">
                      <nav className="inline-flex" role="navigation" aria-label="Navigation">
                        <ul className="flex justify-center">
                          <li className="ml-3 first:ml-0">
                            <a className="btn bg-white border-slate-200 text-slate-300 cursor-not-allowed" href="#0" disabled>&lt;- Previous</a>
                          </li>
                          <li className="ml-3 first:ml-0">
                            <a className="btn bg-white border-slate-200 hover:border-slate-300 color-primary" href="#0">Next -&gt;</a>
                          </li>
                        </ul>
                      </nav>
                    </div>

                  </div>
                </div>                

              </div>

              {/* Right content */}
              <ForumRightContent />              

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Forum;