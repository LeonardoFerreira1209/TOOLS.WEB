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
  const [ firstNameValidate, setFirstNameValidate ] = useState(false);
  const [ lastNameValidate, setLastNameValidate ] = useState(false);
  const [ userValidate, setUserValidate ] = useState(false);
  const [ passwordValidate, setPasswordValidate ] = useState(false);
  const [ emailValidate, setEmailValidate ] = useState(false);
  const [ phoneNumberValidate, setPhoneNumberValidate ] = useState(false);
  const [ cpfValidate, setCPFValidate ] = useState(false);

  useEffect(() => {
    values.firstName === "" ? setFirstNameValidate(false) : setFirstNameValidate(true);
    values.lastName === "" ? setLastNameValidate(false) : setLastNameValidate(true);
    values.username === "" ? setUserValidate(false) : setUserValidate(true);
    values.password === "" ? setPasswordValidate(false) : setPasswordValidate(true);
    values.email === "" ? setEmailValidate(false) : setEmailValidate(true);
    values.phoneNumber === "" ? setPhoneNumberValidate(false) : setPhoneNumberValidate(true);
    values.cpf === "" ? setCPFValidate(false) : setCPFValidate(true);

  }, [values]);

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
          User: {
            Username: values.username,
            Password: values.password,
            Email: values.email,
            PhoneNumber: values.phoneNumber
          }
        }),
        cache: 'no-cache',
        credentials:'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      .then(response => response.json()).then((results) => {
        debugger
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
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                  <input data-aos="fade-right" onChange={onChange} value={values.firstName} id="firstName" name='firstName' className="form-input w-full" placeholder='Leonardo' type="firstName" />
                    {
                      !firstNameValidate && <div id='firstNameValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
                </div>
                <div>
                  <label  className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
                  <input data-aos="fade-left" onChange={onChange} value={values.lastName} id="lastName" name='lastName' className="form-input w-full" placeholder='Almeida' type="text" />
                    { 
                      !lastNameValidate && <div id='lastNameValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
                </div>
              </div>
              <div className='grid gap-5 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="username">Nome de usuário<span className="text-rose-500">*</span></label>
                  <input data-aos="fade-right" onChange={onChange} value={values.username} id="username" name='username' className="form-input w-full" type="username" placeholder='Leo.Almeida' autoComplete="on" />
                    {
                      !userValidate && <div id='userValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Senha<span className="text-rose-500">*</span></label>
                  <input data-aos="fade-left" onChange={onChange} value={values.password} id="password" name='password' className="form-input w-full" type="password" placeholder='Example@11011' autoComplete="on" />
                    {
                      !passwordValidate && <div id='passwordValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
                </div>
              </div>
              <div className='grid gap-5 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">E-mail<span className="text-rose-500">*</span></label>
                  <input data-aos="fade-right" onChange={onChange} value={values.email} id="email" name='email' className="form-input w-full" type='email'placeholder='example@example.com' autoComplete="on" />
                    {
                      !emailValidate && <div id='emailValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Celular<span className="text-rose-500">*</span></label>
                  <InputMask data-aos="fade-left" mask={'+99(99)99999-9999'} onChange={onChange} value={values.phoneNumber} id="phoneNumber" name='phoneNumber' className="form-input w-full" type="phoneNumber" placeholder='+99(99)99999-9999' autoComplete="on"/>
                    {
                      !phoneNumberValidate && <div id='phoneNumberValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 mt-2">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="role">Sexo<span className="text-rose-500">*</span></label>
                  <select data-aos="fade-right" onChange={onChange} value={values.gender} id="gender" type="number" name='gender' className="form-select w-full">
                    <option value={1}>Masculino</option>
                    <option value={2}>Feminino</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cpf">Cadastro de Pessoas Física<span className="text-rose-500">*</span></label>
                  <InputMask data-aos="fade-left" mask={'999.999.999-99'} onChange={onChange} value={values.cpf} id="cpf" name='cpf' className="form-input w-full" type="cpf" placeholder='xxx.xxx.xxx-xx' autoComplete="on" />
                  {
                      !cpfValidate && <div id='cpfValidate' className={`text-xs mt-1 text-rose-500`}>Campo obrigatório!</div>
                    }
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