import React from 'react';

import UserImage01 from '../../assets/images/avatar-01.jpg';
import UserImage02 from '../../assets/images/avatar-02.jpg';
import UserImage03 from '../../assets/images/avatar-03.jpg';
import UserImage04 from '../../assets/images/avatar-04.jpg';
import UserImage05 from '../../assets/images/avatar-05.jpg';
import UserImage06 from '../../assets/images/avatar-06.jpg';

function ForumRightContent() {
  return (
    <div className="w-full hidden xl:block xl:w-72">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          {/* Button */}
          <div className="mb-6">
            <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">Create Post</button>
          </div>

          {/* Blocks */}
          <div className="space-y-4">
            
            {/* Block 1 */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-4">Forum Meetups</div>
              <ul>
                {/* Event 1 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase color-primary mb-0.5">Mon 27 Dec</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-slate-800" href="#0">
                        Silicon Valley Bootstrapper Breakfast Online for 2021
                      </a>
                    </div>
                    {/* Avatars */}
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage02}
                          width="28"
                          height="28"
                          alt="User 02"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage03}
                          width="28"
                          height="28"
                          alt="User 03"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage04}
                          width="28"
                          height="28"
                          alt="User 04"
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-400 italic">+22</div>
                    </div>
                  </div>
                  {/* Timeline element */}
                  <div aria-hidden="true">
                    <div className="absolute top-1 -bottom-1 left-0.5 ml-px w-0.5 bg-slate-200" />
                    <div className="absolute top-1 left-0 ml- w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                </li>
                {/* Event 2 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase color-primary mb-0.5">Mon 27 Dec</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-slate-800" href="#0">
                        New York &amp; New Jersey Virtual Retreat
                      </a>
                    </div>
                    {/* Avatars */}
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage01}
                          width="28"
                          height="28"
                          alt="User 01"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage04}
                          width="28"
                          height="28"
                          alt="User 04"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage05}
                          width="28"
                          height="28"
                          alt="User 05"
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-400 italic">+132</div>
                    </div>
                  </div>
                  {/* Timeline element */}
                  <div aria-hidden="true">
                    <div className="absolute top-1 -bottom-1 left-0.5 ml-px w-0.5 bg-slate-200" />
                    <div className="absolute top-1 left-0 ml- w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                </li>
                {/* Event 3 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase color-primary mb-0.5">Mon 29 Dec</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-slate-800" href="#0">
                        The World of AI and Machine Learning - Open Chat
                      </a>
                    </div>
                    {/* Avatars */}
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage06}
                          width="28"
                          height="28"
                          alt="User 06"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage03}
                          width="28"
                          height="28"
                          alt="User 03"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage01}
                          width="28"
                          height="28"
                          alt="User 01"
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-400 italic">+12</div>
                    </div>
                  </div>
                  {/* Timeline element */}
                  <div aria-hidden="true">
                    <div className="absolute top-1 -bottom-1 left-0.5 ml-px w-0.5 bg-slate-200" />
                    <div className="absolute top-1 left-0 ml- w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                </li>
                {/* Event 4 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase color-primary mb-0.5">Mon 29 Dec</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-slate-800" href="#0">
                        NYC Code &amp; Coffee 2.0 @ Freehold Brooklyn
                      </a>
                    </div>
                    {/* Avatars */}
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage03}
                          width="28"
                          height="28"
                          alt="User 03"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage05}
                          width="28"
                          height="28"
                          alt="User 05"
                        />
                        <img
                          className="rounded-full border-2 border-white box-content"
                          src={UserImage04}
                          width="28"
                          height="28"
                          alt="User 04"
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-400 italic">+17</div>
                    </div>
                  </div>
                  {/* Timeline element */}
                  <div aria-hidden="true">
                    <div className="absolute top-1 -bottom-1 left-0.5 ml-px w-0.5 bg-slate-200" />
                    <div className="absolute top-1 left-0 ml- w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <button className="btn-sm w-full bg-white border-slate-200 hover:border-slate-300 color-primary shadow-none">View All</button>
              </div>
            </div>
            
            {/* Block 2 */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-4">Popular Stories</div>
              <ul className="space-y-3">
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      I built and sold 2 small SaaS products and quit my job in the last two years — AMA
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    <a className="font-medium color-primary hover:color-primary" href="#0">
                      markusj
                    </a>{' '}
                    · 2d · 312 comments
                  </div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Besides Product Hunt, where else should I promote my new project? 🤔
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    <a className="font-medium color-primary hover:color-primary" href="#0">
                      katemerlu
                    </a>{' '}
                    · 2h · 7 comments
                  </div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Which are the main channels you use to drive traffic to your website? 📈
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    <a className="font-medium color-primary hover:color-primary" href="#0">
                      sophiestar
                    </a>{' '}
                    · 3d · 66 comments
                  </div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      Failed for the past 12 years as a tech entrepreneur. My key takeaways.
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    <a className="font-medium color-primary hover:color-primary" href="#0">
                      ekuplu89
                    </a>{' '}
                    · 4h · 14 comments
                  </div>
                </li>
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800" href="#0">
                      How to build a following on Twitter as a founder - A guide to growing your audience 🚀
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    <a className="font-medium color-primary hover:color-primary" href="#0">
                      molliehacks
                    </a>{' '}
                    · 3d · 32 comments
                  </div>
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

export default ForumRightContent;
