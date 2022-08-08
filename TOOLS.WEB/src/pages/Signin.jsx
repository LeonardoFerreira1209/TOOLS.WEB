import React, { useState, useContext, useEffect } from 'react';
import Context from '../components/store/Context';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

import AuthImage from '../images/—Pngtree—2 5d learn know how_4117072.jpg';
import AuthDecoration from '../images/auth-decoration.png';

import 'aos/dist/aos.css';

function Signin() {
   const navigate = useNavigate();
   const { state } = useLocation();
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

  // -- Inputs 
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(Context);

  function initialState() {
    return {user: '', password: ''};
  }
  // -- Inputs

  // -- Validates
  const [ userValidate, setUserValidate ] = useState(
      values.user !== "" ? "hide-error-input-message" : ""
  );
  const [ passwordValidate, setPasswordValidate ] = useState(
    values.password !== "" ? "hide-error-input-message" : ""
  );

  useEffect(() => {
    values.user === "" ? setUserValidate("") : setUserValidate("hide-error-input-message");

    values.password === "" ? setPasswordValidate("") : setPasswordValidate("hide-error-input-message"); 

  }, [values]);
  // -- Validates

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

    fetch("https://localhost:7125/api/User/authetication", {
      headers: {
        'username': values.user,
        'password': values.password
    },
      crossDomain:true,
      mode:'cors', 
      method: 'GET',
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then(response => response.json()).then((results) => {
        if(results.sucesso){
          setToken(results.dados.value); navigate(state?.path || "/dashboard");
        }
        else{
          setError(results.notificacoes[0].mensagem); setLoading(false);
        }
      },
      (error) => {
        setError(error);
      }
    )
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
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Olá novamente! ✨</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="user">Usuário</label>
                    <input onChange={onChange} value={values.user} id="user" name='user' className="form-input w-full" type="user" />
                    <div id='userValidate' className={`text-xs mt-1 text-rose-500 ${userValidate}`}>Campo obrigatório!</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Senha</label>
                    <input onChange={onChange} value={values.password} id="password" name='password' className="form-input w-full" type="password" autoComplete="on" />
                    <div id='passwordValidate' className={`text-xs mt-1 text-rose-500 ${passwordValidate}`}>Campo obrigatório!</div>
                  </div>
                </div>
                {/* Error */}
                {error !== null ? (
                  <div className="mt-5">
                    <div className="bg-gradient-danger-500 text-white px-3 py-2 rounded">
                      x&ensp;
                      <span className="text-sm">
                        {error}
                      </span>
                    </div>
                  </div>) : null}
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">Esqueceu a senha ?</Link>
                  </div>
                  <button onClick={Signin} className="btn bg-gradient-primary-500 text-white ml-3">
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
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Não têm uma conta ? <Link className="font-medium color-primary hover:color-primary" to="/signup">Se cadastrar</Link>
                </div>
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded">
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
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}

export default Signin;