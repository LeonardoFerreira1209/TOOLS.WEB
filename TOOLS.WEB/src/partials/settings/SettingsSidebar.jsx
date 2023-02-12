import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SettingsSidebar({ props }) {
  const location = useLocation();
  
  const { pathname } = location;

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3">
      {/* Group 1 */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Configurações da conta</div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to={`/settings/account/${props.id}`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes(`/settings/account/${props.id}`) && 'bg-indigo-50'}`}>
              <svg className={`w-5 h-6 mr-2 ${pathname.includes(`/settings/account/${props.id}`) && 'color-primary'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes(`/settings/account/${props.id}`) ? 'color-primary' : 'hover:text-slate-700'}`}>Dados básicos</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to={`/settings/permission/${props.id}`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes(`/settings/permission/${props.id}`) && 'bg-indigo-50'}`}>
              <svg className={`w-5 h-6 mr-2 ${pathname.includes(`/settings/permission/${props.id}`) && 'color-primary'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes(`/settings/business`) ? 'color-primary' : 'hover:text-slate-700'}`}>Permissões do usuário</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to={`/settings/business/${props.id}`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes(`/settings/business/${props.id}`) && 'bg-indigo-50'}`}>
              <svg className={`w-5 h-6 mr-2 ${pathname.includes(`/settings/business/${props.id}`) && 'color-primary'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes(`/settings/business`) ? 'color-primary' : 'hover:text-slate-700'}`}>Dados profissionais</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to={`/settings/notifications`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes(`/settings/notifications`) && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 fill-current text-slate-400 mr-2 ${pathname.includes(`/settings/notifications`) && 'color-primary'}`} viewBox="0 0 16 16">
                <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes(`/settings/notifications`) ? 'color-primary' : 'hover:text-slate-700'}`}>My Notifications</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/apps" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/apps') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes('/settings/apps') && 'color-primary'}`} viewBox="0 0 16 16">
                <path d="M3.414 2L9 7.586V16H7V8.414l-5-5V6H0V1a1 1 0 011-1h5v2H3.414zM15 0a1 1 0 011 1v5h-2V3.414l-3.172 3.172-1.414-1.414L12.586 2H10V0h5z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/apps') ? 'color-primary' : 'hover:text-slate-700'}`}>Connected Apps</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/plans" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/plans') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes('/settings/plans') && 'color-primary'}`} viewBox="0 0 16 16">
                <path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/plans') ? 'color-primary' : 'hover:text-slate-700'}`}>Plans</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/billing" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/billing') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes('/settings/billing') && 'color-primary'}`} viewBox="0 0 16 16">
                <path d="M15 4c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h7c.6 0 1 .4 1 1v3h4zM2 3v1h7V2H3c-.6 0-1 .4-1 1zm12 11V6H2v7c0 .6.4 1 1 1h11zm-3-5h2v2h-2V9z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/billing') ? 'color-primary' : 'hover:text-slate-700'}`}>Billing & Invoices</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Group 2 */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Experience</div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink end to="/settings/feedback" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/feedback') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${pathname.includes('/settings/feedback') && 'color-primary'}`} viewBox="0 0 16 16">
                <path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/feedback') ? 'color-primary' : 'hover:text-slate-700'}`}>Give Feedback</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsSidebar;