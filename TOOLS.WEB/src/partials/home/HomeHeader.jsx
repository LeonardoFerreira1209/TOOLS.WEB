import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../utils/Dropdown";


function HomeHeader() {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
                  <stop stopColor="#00BFFB" offset="0%"/>
                  <stop stopColor="#0270D7" offset="100%"/>
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
                  <stop stopColor="#1F232A" stopOpacity=".48" offset="0%"/>
                  <stop stopColor="#1F2329" stopOpacity="0" offset="100%"/>
                </linearGradient>
                <linearGradient x1="87.665%" y1="103.739%" x2="-3.169%" y2="38.807%" id="c">
                  <stop stopColor="#FFF" stopOpacity="0" offset="0%"/>
                  <stop stopColor="#FFF" stopOpacity=".64" offset="100%"/>
                </linearGradient>
                <linearGradient x1="-14.104%" y1="111.262%" x2="109.871%" y2="26.355%" id="d">
                  <stop stopColor="#0270D7" offset="0%"/>
                  <stop stopColor="#0270D7" stopOpacity="0" offset="100%"/>
                 </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path fill="url(#a)" transform="rotate(90 14 16)" d="M6 2l-8 13.999L6 30h16l8-14.001L22 2z"/>
                <path fill="url(#b)" d="M14 0v32L0 24V8z"/>
                <path fill="url(#c)" d="M28 24L0 8l14.001-8L28 8z"/>
                <path fillOpacity=".48" fill="url(#d)"  d="M28 8L0 23.978V8l14.001-8L28 8z"/>
              </g>
            </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link to="/dashboard" className="text-[#008df6] hover:text-sky-400 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#008df6] hover:text-sky-400 px-4 py-2 flex items-center transition duration-150 ease-in-out">Pricing</Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#008df6] hover:text-sky-400 px-4 py-2 flex items-center transition duration-150 ease-in-out">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-[#008df6] hover:text-sky-400 px-4 py-2 flex items-center transition duration-150 ease-in-out">About us</Link>
              </li>
              {/* 1st level: hover */}
              <Dropdown title="Support">
                {/* 2nd level: hover */}
                <li>
                  <Link to="/contact" className="font-medium text-sm text-[#008df6] hover:text-sky-400 flex py-2 px-4 leading-tight">Contact us</Link>
                </li>
                <li>
                  <Link to="/help" className="font-medium text-sm text-[#008df6] hover:text-sky-400 flex py-2 px-4 leading-tight">Help center</Link>
                </li>
                <li>
                  <Link to="/404" className="font-medium text-sm text-[#008df6] hover:text-sky-400 flex py-2 px-4 leading-tight">404</Link>
                </li>
              </Dropdown>
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link to="/signin" className="font-medium text-[#008df6] hover:text-sky-400 px-4 py-3 flex items-center transition duration-150 ease-in-out">Entrar</Link>
              </li>
              <li>
                <Link to="/signup" className="btn-sm text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-3">Cadastre-se</Link>
              </li>
            </ul>

          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">

            {/* Hamburger button */}
            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 } }>
              <ul className="bg-gray-800 px-4 py-2">
                <li>
                  <Link to="/features" className="flex text-gray-300 hover:text-gray-200 py-2">Features</Link>
                </li>
                <li>
                  <Link to="/pricing" className="flex text-gray-300 hover:text-gray-200 py-2">Pricing</Link>
                </li>
                <li>
                  <Link to="/blog" className="flex text-gray-300 hover:text-gray-200 py-2">Blog</Link>
                </li>
                <li>
                  <Link to="/about" className="flex text-gray-300 hover:text-gray-200 py-2">About us</Link>
                </li>
                <li className="py-2 my-2 border-t border-b border-gray-700">
                  <span className="flex text-gray-300 py-2">Support</span>
                  <ul className="pl-4">
                    <li>
                      <Link to="/contact" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Contact us</Link>
                    </li>
                    <li>
                      <Link to="/help" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Help center</Link>
                    </li>
                    <li>
                      <Link to="/404" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">404</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/signin" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup" className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out">Sign up</Link>
                </li>
              </ul>
            </nav>

          </div>

        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
