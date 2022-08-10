import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Transition from '../utils/Transition';
import Context from './store/Context';
import StoreContext from "./store/Context";

function DropdownProfile({
  align
}) {

  // -- CONSTS
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { setToken } = useContext(Context);
  const { setTokenData } = useContext(Context);
  const { tokenData } = useContext(StoreContext)
  
  const navigate = useNavigate();
  // -- CONSTS
  
  // -- SIGNOUT
  function SigninOut(event) {
    event.preventDefault();

    setToken(null); setTokenData(null);

    navigate("/");
  }
  // -- SIGNOUT

  // -- DROPDOWN
  useEffect(() => { // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => { // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  // -- DROPDOWN

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <lord-icon
            src="https://cdn.lordicon.com/mpdklqnq.json"
            trigger="morph"
            style={{with:32, height:32}}>
        </lord-icon>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">{tokenData.unique_name}.</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">{tokenData.unique_name}.</div>
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm color-primary hover:color-primary flex items-center py-1 px-3"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Configurações
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm color-primary hover:color-primary flex items-center py-1 px-3"
                onClick={SigninOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;