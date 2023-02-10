import React from 'react';

import GroupAvatar01 from '../../assets/images/group-avatar-01.png';
import GroupAvatar02 from '../../assets/images/group-avatar-02.png';
import GroupAvatar03 from '../../assets/images/group-avatar-03.png';
import GroupAvatar04 from '../../assets/images/group-avatar-04.png';
import UserImage01 from '../../assets/images/user-32-01.jpg';
import UserImage02 from '../../assets/images/user-32-02.jpg';
import UserImage04 from '../../assets/images/user-32-04.jpg';
import UserImage05 from '../../assets/images/user-32-05.jpg';

function FeedRightContent() {
  return (
    <div className="w-full hidden xl:block xl:w-72">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">

          {/* Search form */}
          <div className="mb-6">
            <form className="relative">
              <label htmlFor="feed-search-desktop" className="sr-only">
                Search
              </label>
              <input id="feed-search-desktop" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search…" />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Blocks */}
          <div className="space-y-4">
            
            {/* Block 1 */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-4">Top Communities</div>
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={GroupAvatar01} width="32" height="32" alt="Group 01" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Introductions</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Join
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={GroupAvatar02} width="32" height="32" alt="Group 02" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">HackerNews</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Join
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={GroupAvatar03} width="32" height="32" alt="Group 03" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">ReactJs</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                      </svg>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={GroupAvatar04} width="32" height="32" alt="Group 04" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">JustChatting</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Join
                    </button>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <button className="btn-sm w-full bg-white border-slate-200 hover:border-slate-300 color-primary shadow-none">View All</button>
              </div>
            </div>
            
            {/* Block 2 */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-4">Who to follow</div>
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={UserImage02} width="32" height="32" alt="User 02" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Elly Boutin</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Follow
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={UserImage04} width="32" height="32" alt="User 04" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Rich Harris</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Follow
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={UserImage05} width="32" height="32" alt="User 05" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Mary Porzio</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Follow
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="relative mr-3">
                        <img className="w-8 h-8 rounded-full" src={UserImage01} width="32" height="32" alt="User 01" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Brian Lovin</span>
                      </div>
                    </div>
                    <button className="text-xs inline-flex font-medium bg-indigo-100 color-primary rounded-full text-center px-2.5 py-1">
                      Follow
                    </button>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <button className="btn-sm w-full bg-white border-slate-200 hover:border-slate-300 color-primary shadow-none">View All</button>
              </div>
            </div>
            
            {/* Block 3 */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-4">Trends for you</div>
              <ul className="space-y-3">
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Tracking your website traffic on launch day 📈
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">248 comments</div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Freemium model questions
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">47 comments</div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Slack and Community
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">24 comments</div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Who owns user onboarding in your company?
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">17 comments</div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Questions from a very confused Web3 startup founder 🤔
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">9 comments</div>
                </li>
              </ul>
              <div className="mt-4">
                <button className="btn-sm w-full bg-white border-slate-200 hover:border-slate-300 color-primary shadow-none">View All</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedRightContent;
