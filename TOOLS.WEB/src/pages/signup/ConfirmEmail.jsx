import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { confirmEmail }  from '../../shared/services/userService';
import InputMask from 'react-input-mask';

import AuthImage from '../../assets/images/—Pngtree—2 5d learn know how_4117072.webp';
import AuthDecoration from '../../assets/images/auth-decoration.png';

import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';

function ConfirmEmaill() {
  const params = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState(initialState);

  function initialState() {
    return {
      codeNumber1: '', 
      codeNumber2: '', 
      codeNumber3: '', 
      codeNumber4: ''
    };
  }

  function onChange(event) {
    const {value, name} = event.target;
    setValues(
      {...values, 
        [name]: value
      });
  }

  function ConfirmEmail(event) {
    setLoading(true);
    event.preventDefault();
    let code = Object.values(values).join("");
    confirmEmail(navigate, setError, setLoading, params.state.userId, code);
  }

  return (
    <main className="bg-white">
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

            {
              params.state.progressBarEnabled && (
                  <div data-aos="fade-right" className="px-4 pt-12 pb-8">
                  <div className="max-w-md mx-auto w-full">
                    <div className="relative">
                      <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                      <ul className="relative flex justify-between w-full">
                        <li>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">1</div>
                        </li>
                        <li>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">2</div>
                        </li>
                        <li>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">3</div>
                        </li>
                        <li>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">4</div>
                        </li>
                        <li>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">5</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 data-aos="fade-down" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 font-bold">Estamos quase lá <b className='text-indigo-100'>✨</b></h1>
              <h2 className="text-sky-600 font-bold mb-4">Enviamos um código para o seu e-mail, verifique e siga os passos abaixo!</h2>
              <p className='bg-clip-text text-transparent bg-gradient-to-l from-indigo-400 to-sky-900 mb-6'>Adicione o código abaixo, para liberar o seu acesso!</p>
              {/* Form */}
              <form className='text-center'>
                 {/* IziToast */}
                <ToastContainer className="toast-position"></ToastContainer> 
                <div className="inline-grid grid-cols-4 gap-5 ">
                  <div data-aos="fade-left">
                    <InputMask mask={'9'} onChange={onChange} value={values.codeNumber1} id="codeNumber1" name='codeNumber1'className="form-input w-14 text-center" type="text" />
                  </div>
                  <div data-aos="fade-left">
                    <InputMask mask={'9'} onChange={onChange} value={values.codeNumber2} id="codeNumber2" name='codeNumber2'className="form-input w-14 text-center" type="text" />
                  </div>
                  <div data-aos="fade-left">
                    <InputMask mask={'9'} onChange={onChange} value={values.codeNumber3} id="codeNumber3" name='codeNumber3'className="form-input w-14 text-center" type="text" />
                  </div>
                  <div data-aos="fade-left">
                    <InputMask mask={'9'} onChange={onChange} value={values.codeNumber4} id="codeNumber4" name='codeNumber4'className="form-input w-14 text-center" type="text" />
                  </div>
                </div>

                {/* Error */}
                { error !== null && 
                <div className="mt-5">
                  <div data-aos="fade-left" className="bg-gradient-danger-500 text-white px-3 py-2 rounded">
                    <b>x</b>&ensp;
                    <span className="text-sm">
                      {error}
                    </span>
                  </div>
                </div> }

                <div className="flex items-center justify-between mt-6">
                  <div data-aos="fade-up" className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">Enviar novo código?</Link>
                  </div>
                  <button data-aos="fade-up" onClick={ConfirmEmail} className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-3">
                    {loading === false  ? ("Confirmar!") : (
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

export default ConfirmEmaill;