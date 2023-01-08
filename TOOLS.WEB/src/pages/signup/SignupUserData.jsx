import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import InputMask from 'react-input-mask';

import AuthImage from '../../images/—Pngtree—2 5d learn know how_4117072.jpg';
import AuthDecoration from '../../images/auth-decoration.png';

function SignupUserData() {

  // -- INPUTS 
  const params = useLocation();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // params obj
  const data = { situation: params.state.situation, unloadedanimation: false, intendedtype: params.state.intendedtype, firstname: params.state.firstname, lastname:  params.state.lastname, cpf: params.state.cpf, birthday: params.state.birthday, rg: params.state.rg, gender: params.state.gender, username: values.username, password: values.password, email: values.email, phoneNumber: values.phoneNumber };

  // -- VALIDATES
  function isInvalid() {
    if(values.username === "" || values.username === undefined) { setError("Preencha o campo nome de usuário!"); return true; }

    if(values.password === "" || values.password === undefined) { setError("Preencha o campo senha!"); return true; }

    if(values.email === "" || values.email === undefined) { setError("Preencha o campo e-mail!"); return true; }

    if(values.phoneNumber === "" || values.phoneNumber === undefined) { setError("Preencha o campo celular!"); return true; }

    return false;
  };
  // -- VALIDATES

  function initialState() {
      return {
      username: params.state.username,
      password: params.state.password,
      email: params.state.email,
      phoneNumber: params.state.phoneNumber,
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
   function Create(event) {
    
    event.preventDefault();

    setLoading(true);

    if(!isInvalid())
    {
      fetch(`${process.env.BASE_URL}api/User/create`, 
      {
          crossDomain:true,
          headers: {
            'Content-Type': 'application/json',
          },
          mode:'cors', 
          method: 'POST',
          body: JSON.stringify({
            FirstName: params.state.firstname,
            LastName: params.state.lastname,
            BirthDay: params.state.birthday,
            Gender: params.state.gender,
            RG: params.state.rg,
            CPF: params.state.cpf,
            UserName: values.username,
            Email: values.email,
            Password: values.password,
            PhoneNumber: values.phoneNumber,
            PlanId: `${process.env.PLAN_ID}`
          })
        })
        .then(response => response.json()).then((results) => {
            if(results.sucesso){    
              navigate("/signin");
            }
            else{
              setError(results.notificacoes[0].mensagem); setLoading(false);
            }
          },
          (error) => {
            console.error(error);

            setError("Ops, não conseguimos fazer a requisição!"); setLoading(false);
          }

        ).catch(error => {
          console.error(error);

          setError("Ops, tivemos um erro inesperado!"); setLoading(false);
      });
    };
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
              <NavLink end to="/" className="block">
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
              <div className="text-sm">
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
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">2</div>
                  </li>
                  <li>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">3</div>
                  </li>
                  <li>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 text-white">4</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:max-w-md lg:max-w-lg mx-auto px-4 py-8">
            <h1 data-aos="fade-left" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 font-bold mb-6">Informe os dados de usuário<b className='text-indigo-100'>✨</b></h1>
            {/* Form */}
            <form>
              <div className='grid gap-3 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="username">Nome de usuário<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.username} id="username" name='username' className="form-input w-full pl-9" type="username" autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-indigo-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Senha<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.password} id="password" name='password' className="form-input w-full pl-9" type="password" autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-indigo-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid gap-3 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">E-mail<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.email} id="email" name='email' className="form-input w-full pl-9" type='email' autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-indigo-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Celular<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <InputMask mask={'+99(99)99999-9999'} onChange={onChange} value={values.phoneNumber} id="phoneNumber" name='phoneNumber' className="form-input w-full pl-9" type="phoneNumber" autoComplete="on"/>
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-slate-500 ml-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
               {/* Error */}
               { error !== null && 
                  <div data-aos="fade-left" className="mt-5">
                    <div className="bg-gradient-danger-500 text-white px-3 py-2 rounded">
                      x&ensp;
                      <span className="text-sm">
                        {error}
                      </span>
                    </div>
                  </div> }
              <div className="flex items-center justify-between mt-6">
                <Link className="text-sm underline text-red-300 hover:no-underline" to={`/signup/basic`} state={ data }>&lt;- Voltar</Link>
                <button onClick={Create} type="button" className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-auto">
                    {loading === false  ? ("Criar usuário") : (
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
        <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"  src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
      </div>
    </div>
  </main>
  );
  // -- RETURN
}

export default SignupUserData;