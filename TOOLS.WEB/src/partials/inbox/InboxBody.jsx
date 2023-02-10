import React from 'react';
import Mail from './Mail';

import mailUser01 from '../../assets/images/user-40-11.jpg';
import mailUser02 from '../../assets/images/user-avatar-80.png';
import mailImage from '../../assets/images/inbox-image.jpg';

function InboxBody({
  inboxSidebarOpen,
  setInboxSidebarOpen
}) {

  const mails = [
    {
      id: '0',
      open: false,
      image: mailUser01,
      name: 'Dominik Lamakani',
      email: 'dominiklama@acme.com',
      date: 'Sep 3, 3:18 PM',
      recipients: ['me', 'Carolyn'],
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore…',
      message: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Consectetur adipiscing elit, sed do eiusmod aliqua? Check below:</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><p>Cheers,</p><p class="font-medium">Dominik Lamakani</p>',
    },
    {
      id: '1',
      open: false,
      image: mailUser02,
      name: 'Acme Inc.',
      email: 'acmeinc@acme.com',
      date: 'Sep 3, 3:18 PM',
      recipients: ['me', 'Dominik'],
      excerpt: 'Dominik, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt…',
      message: '<p>Dominik, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Consectetur adipiscing elit, sed do eiusmod aliqua? Check below:</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><p>Cheers,</p><p class="font-medium">Acme Inc.</p>',
    },
    {
      id: '2',
      open: true,
      image: mailUser01,
      name: 'Dominik Lamakani',
      email: 'dominiklama@acme.com',
      date: 'Sep 4, 3:37 AM',
      recipients: ['me', 'Carolyn'],
      excerpt: 'Hey Acme 👋 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt…',
      message: `<p>Hey Acme 👋</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <span class="underline">nostrud exercitation ullamco</span> laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Consectetur adipiscing elit, sed do eiusmod <a class="font-medium color-primary hover:color-primary" href="#0">tempor magna</a> aliqua? Check below:</p><p><img src=${mailImage} width="320" height="190" alt="Inbox image" /></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><p>Cheers,</p><p class="font-medium">Dominik Lamakani</p>`,
    },
  ];

  return (
    <div className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${inboxSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'}`}>

      {/* Header */}
      <div className="sticky top-16">
        <div className="flex items-center justify-between bg-slate-50 border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16">
          {/* Buttons on the left side */}
          <div className="flex">
            {/* Close button */}
            <button
              className="md:hidden text-slate-400 hover:text-slate-500 mr-4"
              onClick={() => setInboxSidebarOpen(!inboxSidebarOpen)}
              aria-controls="inbox-sidebar"
              aria-expanded={inboxSidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            <button className="p-1.5 shrink-0 rounded bg-white border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
              <svg className="w-4 h-4 fill-current text-slate-400" viewBox="0 0 16 16">
                <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
              </svg>
            </button>
            <button className="p-1.5 shrink-0 rounded bg-white border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
              <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                <path d="M10 5.934 8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
              </svg>
            </button>
            <button className="p-1.5 shrink-0 rounded bg-white border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
              <svg className="w-4 h-4 fill-current text-slate-400" viewBox="0 0 16 16">
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
              </svg>
            </button>
            <button className="p-1.5 shrink-0 rounded bg-white border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
              <svg className="w-4 h-4 fill-current color-primary" viewBox="0 0 16 16">
                <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
              </svg>
            </button>
          </div>
          {/* Buttons on the right side */}
          <div className="flex items-center">
            <div className="text-xs mr-1"><span className="font-medium">10</span> <span className="text-slate-500">of</span> <span className="font-medium">467</span></div>
            <button className="p-1.5 shrink-0 rounded bg-white border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <path d="m10 13.4 1.4-1.4-4-4 4-4L10 2.6 4.6 8z" />
              </svg>
            </button>
            <button className="p-1.5 shrink-0 rounded bg-white border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <path d="M7 13.4 5.6 12l4-4-4-4L7 2.6 12.4 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grow px-4 sm:px-6 md:px-5 py-4">

        {/* Mail subject */}
        <header className="sm:flex sm:items-start sm:justify-between mb-4">
          <h1 className="text-xl leading-snug text-slate-800 font-bold mb-1 sm:mb-0 ml-2">Chill your mind with this amazing offer 🎉</h1>
          <button className="text-xs inline-flex font-medium bg-sky-100 text-sky-600 rounded-full text-center px-2.5 py-1 whitespace-nowrap">Exciting news</button>
        </header>

        {/* Messages box */}
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 px-6 divide-y divide-slate-200">

          {
            mails.map(mail => {
              return (
                <Mail
                  key={mail.id}
                  id={mail.id}
                  open={mail.open}
                  image={mail.image}
                  name={mail.name}
                  email={mail.email}
                  date={mail.date}
                  recipients={mail.recipients}
                  excerpt={mail.excerpt}
                  message={mail.message}
                />
              )
            })
          }

        </div>

      </div>

      {/* Footer */}
      <div className="sticky bottom-0">
        <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
          {/* Plus button */}
          <button className="shrink-0 text-slate-400 hover:text-slate-500 mr-3">
            <span className="sr-only">Add</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
            </svg>
          </button>
          {/* Message input */}
          <form className="grow flex">
            <div className="grow mr-3">
              <label htmlFor="message-input" className="sr-only">Type a message</label>
              <input id="message-input" className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300" type="text" placeholder="Aa" />
            </div>
            <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">Send -&gt;</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default InboxBody;
