import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import InputMask from 'react-input-mask';

import AuthImage from '../images/—Pngtree—2 5d learn know how_4117072.jpg';
import AuthDecoration from '../images/auth-decoration.png';

function Signup() {

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
            </div>
          </div>

          <div className="md:max-w-md lg:max-w-lg mx-auto px-4 py-8">
            <h1 data-aos="fade-down" className="text-3xl text-slate-800 font-bold mb-6">Crie sua conta ✨</h1>
            {/* Form */}
            <form>
              <div className='grid gap-2 grid-cols-2 mt-2'>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.firstName} id="firstName" name='firstName' className="form-input w-full pl-9" placeholder='Leonardo' type="firstName" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.lastName} id="lastName" name='lastName' className="form-input w-full pl-9" placeholder='Almeida' type="text" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid gap-5 md:grid-cols-2 mt-2'>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="username">Nome de usuário<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.username} id="username" name='username' className="form-input w-full pl-9" type="username" placeholder='Leo.Almeida' autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Senha<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.password} id="password" name='password' className="form-input w-full pl-9" type="password" placeholder='Example@11011' autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid gap-5 md:grid-cols-2 mt-2'>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">E-mail<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.email} id="email" name='email' className="form-input w-full pl-9" type='email'placeholder='example@example.com' autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Celular<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <InputMask mask={'+99(99)99999-9999'} onChange={onChange} value={values.phoneNumber} id="phoneNumber" name='phoneNumber' className="form-input w-full pl-9" type="phoneNumber" placeholder='+99(99)99999-9999' autoComplete="on"/>
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-500 ml-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 mt-2">
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="role">Sexo<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <select onChange={onChange} value={values.gender} id="gender" type="number" name='gender' className="form-select w-full pl-9">
                      <option value={1}>Masculino</option>
                      <option value={2}>Feminino</option>
                    </select>
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-left">
                  <label className="block text-sm font-medium mb-1" htmlFor="cpf">Cadastro de Pessoas Física<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <InputMask mask={'999.999.999-99'} onChange={onChange} value={values.cpf} id="cpf" name='cpf' className="form-input w-full pl-9" type="cpf" placeholder='xxx.xxx.xxx-xx' autoComplete="on" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
               {/* Error */}
               { error !== null && 
                  <div className="mt-5">
                    <div data-aos="fade-up" className="bg-gradient-danger-500 text-white px-3 py-2 rounded">
                      x&ensp;
                      <span className="text-sm">
                        {error}
                      </span>
                    </div>
                  </div> }
              <div data-aos="fade-right" className="flex items-center justify-between mt-6">
                <div className="mr-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm ml-2">Receber e-mail com novidades.</span>
                  </label>
                </div>
                <button data-aos="fade-up" onClick={Create} className="btn bg-gradient-primary-500 text-white ml-3 whitespace-nowrap">
                {
                  !loading ? ("Cadastrar") : (
                    <lord-icon
                      src="https://cdn.lordicon.com/yiniatmi.json"
                      trigger="loop"
                      colors="primary:#ffffff"
                      style={{width:67,height:20}}>
                    </lord-icon>
                  )}
                </button>
              </div>
            </form>
            {/* Footer */}
            <div data-aos="fade-up" className="pt-5 mt-6 border-t border-slate-200">
              <div className="text-sm">
                Já têm uma conta? <Link className="font-medium color-primary hover:color-primary" to="/signin">Entrar</Link>
              </div>
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

export default Signup;