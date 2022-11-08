import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import InputMask from 'react-input-mask';

import AuthImage from '../images/—Pngtree—2 5d learn know how_4117072.jpg';
import AuthDecoration from '../images/auth-decoration.png';

function Signup01() {

  // -- INPUTS 
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // -- VALIDATES
  function isInvalid() {
    if(values.firstName === "") { setError("Preencha o campo nome!");  setLoading(false); return true; }

    if(values.lastName === "") { setError("Preencha o campo sobrenome!"); setLoading(false); return true; }

    if(values.username === "") { setError("Preencha o campo nome de usuário!"); setLoading(false); return true; }

    if(values.password === "") { setError("Preencha o campo senha!"); setLoading(false); return true; }

    if(values.email === "") { setError("Preencha o campo e-mail!"); setLoading(false); return true; }

    if(values.phoneNumber === "") { setError("Preencha o campo celular!"); setLoading(false); return true; }

    if(values.male === "") { setError("Preencha o campo sexo!"); setLoading(false); return true; }

    if(values.cpf === "") { setError("Preencha o campo Cadastro de pessoa física!"); setLoading(false); return true; }

    return false;
  };
  // -- VALIDATES

  function initialState() {
      return {
      firstName: '', 
      lastName: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      gender: 1,
      cpf: ''
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

  // -- API CONSUMER
  function Create(event) {
    event.preventDefault();

    setLoading(true);

    if(!isInvalid())
    {
      fetch("https://localhost:7125/api/User/create", {
        crossDomain:true,
        mode:'cors', 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          FirstName: values.firstName,
          LastName: values.lastName,
          Cpf: values.cpf,
          Gender: values.gender,
          Username: values.username,
          Password: values.password,
          Email: values.email,
          PhoneNumber: values.phoneNumber
        }),
        cache: 'no-cache',
        credentials:'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      .then(response => response.json()).then((results) => {
          if(results.sucesso){
            navigate("/");
          }
          else{
            setError(results.notificacoes[0].mensagem); setLoading(false);
          }
        },
        (error) => {
          setError("Ops, não conseguimos fazer a requisição!"); setLoading(false);
        }
      )
    }
   }
  // -- API CONSUMER

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
              <div data-aos="fade-left" className="text-sm">
                  Já têm uma conta? <Link className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-indigo-500" to="/signin">Entrar</Link>
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
                    <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white" to="/signup01">1</Link>
                  </li>
                  <li>
                    <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/signup02">2</Link>
                  </li>
                  <li>
                    <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding-03">3</Link>
                  </li>
                  <li>
                    <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding-04">4</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 font-bold mb-6">Qual sua situação <b className='text-indigo-100'>✨</b></h1>
                {/* Form */}
                <form>
                  <div className="space-y-3 mb-8">
                    <label className="relative block cursor-pointer">
                      <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                          <path className="text-indigo-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                          <path className="text-sky-500" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
                          <path className="text-indigo-500" d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z" />
                        </svg>
                        <span className="text-slate-500">Eu tenho uma empresa</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="relative block cursor-pointer">
                      <input type="radio" name="radio-buttons" className="peer sr-only" />
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                          <path className="text-indigo-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                          <path className="text-sky-500" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
                        </svg>
                        <span className="text-slate-500">Quero me vincular a uma empresa</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="relative block cursor-pointer">
                      <input type="radio" name="radio-buttons" className="peer sr-only" />
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                          <path className="text-indigo-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                        </svg>
                        <span className="text-slate-500">Sou um freelancer</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Link className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-auto" to="/signup02">Próximo passo -&gt;</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
      {/* Image */}
      <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img data-aos="fade-left" className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"  src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
      </div>
    </div>
  </main>
  );
  // -- RETURN
}

export default Signup01;