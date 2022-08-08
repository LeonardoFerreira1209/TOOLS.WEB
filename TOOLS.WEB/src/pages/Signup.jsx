import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthImage from '../images/—Pngtree—2 5d learn know how_4117072.jpg';
import AuthDecoration from '../images/auth-decoration.png';

function Signup() {
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
              </div>
            </div>

            <div className="md:max-w-md lg:max-w-lg mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Crie sua conta ✨</h1>
              {/* Form */}
              <form>
                <div className='grid gap-2 grid-cols-2'>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                    <input id="firstName" className="form-input w-full" type="firstName" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
                    <input id="lastName" className="form-input w-full" type="text" />
                  </div>
                </div>
                <div className='grid gap-5 md:grid-cols-2'>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="username">Nome de usuário<span className="text-rose-500">*</span></label>
                    <input id="username" className="form-input w-full" type="username" autoComplete="on" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Senha<span className="text-rose-500">*</span></label>
                    <input id="password" className="form-input w-full" type="password" autoComplete="on" />
                  </div>
                </div>
                <div className='grid gap-5 md:grid-cols-2'>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">E-mail<span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" autoComplete="on" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Celular<span className="text-rose-500">*</span></label>
                    <input id="phoneNumber" className="form-input w-full" type="phoneNumber" autoComplete="on" />
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">Sexo<span className="text-rose-500">*</span></label>
                    <select id="gender" className="form-select w-full">
                      <option value={1}>Masculino</option>
                      <option value={2}>Feminino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cpf">Cadastro de Pessoas Física<span className="text-rose-500">*</span></label>
                    <input id="cpf" className="form-input w-full" type="cpf" autoComplete="on" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">Receber e-mail com novidades.</span>
                    </label>
                  </div>
                  <Link className="btn bg-gradient-primary-500 text-white ml-3 whitespace-nowrap" to="/">Cadastrar</Link>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Já têm uma conta? <Link className="font-medium color-primary hover:color-primary" to="/signin">Entrar</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}

export default Signup;