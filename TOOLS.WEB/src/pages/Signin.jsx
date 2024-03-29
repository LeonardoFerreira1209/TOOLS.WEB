import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserProvider } from '../components/store/context/UserContext';
import { authetication, isInvalidAuthentication }  from '../shared/services/userService';
import AuthImage from '../assets/images/—Pngtree—2 5d learn know how_4117072.webp';
import AuthDecoration from '../assets/images/auth-decoration.png';
import { ToastContainer, toast } from 'react-toastify';
import 'aos/dist/aos.css';

function Signin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUserProvider();
  const [values, setValues] = useState(initialState);

  function initialState() {
    return {user: '', password: ''};
  }

  function onChange(event) {
    const {value, name} = event.target;
    setValues(
      {...values, 
        [name]: value
      });
  }

  function Signin(event) {
    setLoading(true);
    event.preventDefault();
    let errors = isInvalidAuthentication(values);
    if(errors.length == 0) {
      authetication(navigate, state, setUser, setLoading, values);
    }
    else {
      setLoading(false);
      errors.forEach((error) => {
        toast.error(error, {
          theme: 'light',
          autoClose: true
        });
      })
    }
  }

  return (
    <main className="bg-white dark:bg-slate-900">
      {/* IziToast */}
      <ToastContainer position="top-right"></ToastContainer>
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <NavLink data-aos="fade-left" end to="/" className="block">
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
                </NavLink>
                
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 data-aos="fade-down" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 font-bold mb-6">Olá novamente! <b className='text-indigo-100'>✨</b></h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div data-aos="fade-left">
                    <label className="block text-sm font-medium mb-1" htmlFor="user">Usuário<span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <input onChange={onChange} value={values.user} id="user" name='user' className="form-input w-full pl-9" type="user" />
                      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                        <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative" data-aos="fade-left">
                    <input id="password" onChange={onChange} value={values.password} name="password" className="form-input w-full pl-9" type={showPassword ? "text" : "password"} />
                    <button type='button' style={{ cursor: "pointer" }} onClick={() => (setShowPassword((current) => !current))} className="absolute inset-0 right-auto group" aria-label="show">
                      {
                        showPassword ? (
                          <svg className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-500 ml-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        ) :
                        (
                          <svg className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-500 ml-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        )
                      }
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div data-aos="fade-up" className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">Esqueceu a senha?</Link>
                  </div>
                  <button data-aos="fade-up" onClick={Signin} className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-3">
                    {loading === false  ? ("Entrar") : (
                      <lord-icon
                        src="https://cdn.lordicon.com/yiniatmi.json"
                        trigger="loop"
                        colors="primary:#ffffff"
                        style={{width:40,height:20}}>
                      </lord-icon>
                    )}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div data-aos="fade-right" className="text-sm">
                  Não têm uma conta? <Link className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-indigo-500" to="/signup/intendedtype" state={ { intendedtype: "1", unloadedanimation: true } }>Se cadastrar</Link>
                </div>

                {/* Warning */}
                <div data-aos="fade-up" className="mt-5">
                  <div className="bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 px-3 py-2 rounded">
                    <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      Caso necessite de ajuda entre em contato com o suporte!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <picture>
            <img data-aos="fade-left" className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          </picture>
          <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>
    </main>
  );
}

export default Signin;