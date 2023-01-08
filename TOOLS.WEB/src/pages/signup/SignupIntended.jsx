import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import AuthImage from '../../images/—Pngtree—2 5d learn know how_4117072.jpg';
import AuthDecoration from '../../images/auth-decoration.png';

function SignupIntended() {
  // -- INPUTS 
  const params = useLocation();
  const [unloadedanimation] = useState(params.state.unloadedanimation);
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  // params obj
  const data = { intendedtype: values.intendedtype, situation: params.state.situation, firstname: params.state.firstname, lastname:  params.state.lastname, cpf: params.state.cpf, birthday: params.state.birthday, rg: params.state.rg, gender: params.state.gender, username: params.state.username, password: params.state.password, email: params.state.email, phoneNumber: params.state.phoneNumber };

  function initialState() {

      return {
        intendedtype: params.state.intendedtype
    };
  }

  function onChange(event) {
    const {value, name} = event.target;

    setValues(
    {...values, 
      [name]: value
    });
  }
  // -- INPUTS

  // -- FUNCTIONS
  function Next(event) {
    event.preventDefault();

    navigate(`/signup/situation`, { state:  data });
   }
  // -- FUNCTIONS

  // -- RETURN
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
              <NavLink data-aos={unloadedanimation ? "fade-left" : ""} end to="/" className="block">
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
              <div  data-aos={unloadedanimation ? "fade-left" : ""} className="text-sm">
                  Já tem uma conta? <Link className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-indigo-500" to="/signin">Entrar</Link>
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div data-aos="fade-right" className="px-4 pt-12 pb-8">
            <div className="max-w-md mx-auto w-full">
              <div className="relative">
                <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                <ul className="relative flex justify-between w-full">
                  <li>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">1</div>
                  </li>
                  <li>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="">2</div>
                  </li>
                  <li>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="">3</div>
                  </li>
                  <li>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="">4</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 data-aos="fade-left" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 font-bold mb-6">Qual seu objetivo ?<b className='text-indigo-100'>✨</b></h1>
                {/* Form */}
                <form>
                <div className="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                    <label className="flex-1 relative block cursor-pointer">
                      <input onChange={onChange} value="1" type="radio" name="intendedtype" className="peer sr-only" checked={values.intendedtype === '1'} />
                      <div className="h-full text-center bg-white px-4 py-6 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="inline-flex w-10 h-10 shrink-0 fill-current mb-2" viewBox="0 0 40 40">
                          <circle className="color-primary" cx="20" cy="20" r="20" />
                          <path className="color-primary" d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                        </svg>
                        <div className="font-medium text-indigo-500 mb-1">Estudo</div>
                        <div className="text-sm">Irei usar o sistema para estudos, sem arrecadação de lucros.</div>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="flex-1 relative block cursor-pointer">
                      <input onChange={onChange} value="2" type="radio" name="intendedtype" className="peer sr-only" checked={values.intendedtype === '2'} />
                      <div className="h-full text-center bg-white px-4 py-6 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="inline-flex w-10 h-10 shrink-0 fill-current mb-2" viewBox="0 0 40 40">
                          <circle className="color-primary" cx="20" cy="20" r="20" />
                          <path className="color-primary" d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                          <circle className="color-primary" cx="20" cy="20" r="20" />
                          <path className="color-primary" d="m30.377 22.749-3.709-1.5a1 1 0 0 1-.623-.926v-.878A3.989 3.989 0 0 0 28.027 16v-1.828c.047-2.257-1.728-4.124-3.964-4.172-2.236.048-4.011 1.915-3.964 4.172V16a3.989 3.989 0 0 0 1.982 3.445v.878a1 1 0 0 1-.623.928c-.906.266-1.626.557-2.159.872-.533.315-1.3 1.272-2.299 2.872 1.131.453 6.075-.546 6.072.682V28a2.99 2.99 0 0 1-.182 1h7.119A.996.996 0 0 0 31 28v-4.323a1 1 0 0 0-.623-.928Z" />
                          <path className="color-primary" d="m22.371 24.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 20 18v-1.828A4.087 4.087 0 0 0 16 12a4.087 4.087 0 0 0-4 4.172V18a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V28a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                        </svg>
                        <div className="font-medium text-indigo-500 mb-1">Profissional</div>
                        <div className="text-sm">Irei usar o sistema profissionalmente, com arrecadação de lucros.</div>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between space-x-6 mb-8">
                    <div>
                      <div className="font-medium text-slate-800 text-sm mb-1">💡 Desejá receber e-mails com novidades?</div>
                      <div className="text-xs">Você pode desativar ou ativar essa funcionalidade nas configurações de usuários.</div>
                    </div>
                    <div className="flex items-center">
                      <div className="form-switch">
                        <input type="checkbox" id="switch" className="sr-only" defaultChecked />
                        <label className="bg-slate-400" htmlFor="switch">
                          <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          <span className="sr-only">Switch label</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <button onClick={Next} className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-auto">Próximo passo -&gt;</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
      {/* Image */}
      <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img  data-aos={unloadedanimation ? "fade-left" : ""} className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"  src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
      </div>
    </div>
  </main>
  );
  // -- RETURN
}

export default SignupIntended;