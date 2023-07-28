import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import AuthImage from '../../assets/images/—Pngtree—2 5d learn know how_4117072.webp';
import AuthDecoration from '../../assets/images/auth-decoration.png';
import { isInvalidSignupPersonalData }  from '../../shared/services/userService';

function SignupPersonalData() {
  const params = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);

  const data = { 
    situation: params.state.situation, 
    unloadedanimation: false, 
    intendedtype: params.state.intendedtype, 
    firstname: values.firstName, 
    lastname: values.lastName, 
    cpf: values.cpf, 
    rg: values.rg, 
    gender: values.gender, 
    username: params.state.username, 
    password: params.state.password, 
    email: params.state.email, 
    phoneNumber: params.state.phoneNumber 
  };

  function initialState() {
      return {
      firstName: params.state.firstname, 
      lastName: params.state.lastname,
      gender: params.state.gender === undefined ? "1" : params.state.gender,
      rg: params.state.rg,
      cpf: params.state.cpf
    };
  }

  function onChange(event) {
    let {value, name} = event.target;
    setValues(
    {...values, 
      [name]: value
    });
  }

  function Next(event) {
    event.preventDefault();
    if(!isInvalidSignupPersonalData(values, setError)) { 
      navigate(`/signup/user`, { state: data }) 
    };
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
                    <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">4</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:max-w-md lg:max-w-lg mx-auto px-4 py-8">
            <h1 data-aos="fade-left" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-500 font-bold mb-6">Informe seus dados pessoais <b className='text-indigo-100'>✨</b></h1>

            {/* Form */}
            <form>
              <div className='grid gap-3 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.firstName} id="firstName" name='firstName' className="form-input w-full pl-9" type="text" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-indigo-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input onChange={onChange} value={values.lastName} id="lastName" name='lastName' className="form-input w-full pl-9" type="text" />
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
                  <label className="block text-sm font-medium mb-1" htmlFor="cpf">CPF<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <InputMask mask={'999.999.999-99'} onChange={onChange} value={values.cpf} id="cpf" name='cpf' className="form-input w-full pl-9" type="cpf"/>
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-indigo-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="rg">RG<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <InputMask mask={'99.999.999-9'} onChange={onChange} value={values.rg} id="rg" name='rg' className="form-input w-full pl-9" type="text" />
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
                  <label className="block text-sm font-medium mb-1" htmlFor="role">Sexo<span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <select onChange={onChange} value={values.gender} id="gender" type="number" name='gender' className="form-select w-full pl-8">
                      <option selected value={"1"}>Masculino</option>
                      <option value={"2"}>Feminino</option>
                    </select>
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-indigo-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

               {/* Error */}
               { error !== null && 
                  <div className="mt-5">
                    <div data-aos="fade-left" className="bg-gradient-danger-500 text-white px-3 py-2 rounded">
                      x&ensp;
                      <span className="text-sm">
                        {error}
                      </span>
                    </div>
                  </div> 
               }

              <div className="flex items-center justify-between mt-6">
                <Link className="text-sm underline text-red-300 hover:no-underline" to={`/signup/situation`} state={ data }>&lt;- Voltar</Link>
                <button onClick={Next} className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-auto">Próximo passo -&gt;</button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Image */}
      <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <picture>
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        </picture>
        <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"  src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
      </div>

    </div>
  </main>
  );
}

export default SignupPersonalData;