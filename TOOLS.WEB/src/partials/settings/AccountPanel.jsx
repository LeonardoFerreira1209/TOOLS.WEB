import React, { useContext, useEffect, useState } from 'react';
import PlaceholderLoading from 'react-placeholder-loading'
import { ToastContainer, toast } from 'react-toastify';
import { useUserProvider } from '../../components/store/context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import InputMask from 'react-input-mask';

import FemaleAvatar from '../../assets/images/—Pngtree—smiling people avatar set different_7691478.png';
import MaleAvatar from '../../assets/images/—Pngtree—smiling people avatar set different_7690723.png';
import { Link } from 'react-router-dom';

function AccountPanel({ props }) {

const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [values, setValues] = useState();
const [avatarImage, setAvatarImage] = useState();
const { user } = useUserProvider();

 useEffect(() => {
  fetch(`${process.env.BASE_URL}gateway/user/get/${props.id}`, 
  {
    headers: {
      'Authorization': `Bearer ${user.tokenJwt}`
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
        setValues({
          id: results.dados.id,
          username: results.dados.userName,
          password: results.dados.password,
          email: results.dados.email,
          phoneNumber: results.dados.phoneNumber,
          firstName: results.dados.firstName,
          lastName: results.dados.lastName,
          age: results.dados.age,
          birthDay: results.dados.birthDay,
          gender: results.dados.gender,
          imageUri: results.dados.imageUri,
          rg: results.dados.rg,
          cpf: results.dados.cpf,
          status: results.dados.status
        });

        setAvatarImage(results.dados.imageUri === null ? results.dados.gender == 2 ? FemaleAvatar : MaleAvatar : results.dados.imageUri);
      },
      // Nota: é importante lidar com errros aqui
      // em vez de um bloco catch() para não receber
      // exceções de erros reais nos componentes.
      (error) => {}
    )

}, [])

function onChange(event) {
  const {value, name} = event.target;

  setValues(
  {...values, 
    [name]: value
  });
 }

function update(event) {
  event.preventDefault();

  setLoading(true);

  fetch(`${process.env.BASE_URL}gateway/user/update`, {
    crossDomain:true,
    mode:'cors', 
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.tokenJwt}`
    },
    body: JSON.stringify({
      Id: values.id,
      Username: values.username,
      CurrentPassword: values.currentPassword,
      Password: values.password,
      Email: values.email,
      PhoneNumber: values.phoneNumber,
      FirstName: values.firstName,
      LastName: values.lastName,
      Gender: values.gender,
      Rg: values.rg,
      Cpf: values.cpf,
      Age: values.age,
      Birthday: values.birthDay,
      status: values.status,
      imageUri: values.imageUri
    })
  })
  .then(response => response.json()).then((results) => {
      if(results.sucesso) {
        toast.success("Edição feita com sucesso!", {
          theme: 'light',
          autoClose: true
        });

        setValues({
          id: results.dados.id,
          username: results.dados.userName,
          password: results.dados.password,
          email: results.dados.email,
          phoneNumber: results.dados.phoneNumber,
          firstName: results.dados.firstName,
          lastName: results.dados.lastName,
          age: results.dados.age,
          birthDay: results.dados.birthDay,
          gender: results.dados.gender,
          imageUri: results.dados.imageUri,
          rg: results.dados.rg,
          cpf: results.dados.cpf,
          status: results.dados.status
        });

        setLoading(false);
      }
      else {
        toast.info(results.notificacoes[0].mensagem, {
          theme: 'light',
          autoClose: true
        });
        
        setLoading(false);
      }
    },
    (error) => {
      console.error(error.message);
      
      toast.error("Ops, Falha ao editar!", {
        theme: 'light',
        autoClose: true
      });

      setLoading(false);
    }

  ).catch((error) => {
    console.error(error.message);

    toast.error("Ops, Falha ao editar!", {
      theme: 'light',
      autoClose: true
    });

    setLoading(false);
  })
}

function changeImage(event) {
const formData = new FormData();

formData.append('File', event.target.files[0]);

fetch(`${process.env.BASE_URL}gateway/user/updateuserimage/${values.id}`, { 
  method: 'PATCH',
  headers: { 
    'Authorization': `Bearer ${user.tokenJwt}`
  },
  body: formData,
  dataType: "jsonp"
  })
  .then(response => response.json()).then((results) => {
    if(results.sucesso) {
      const avatar = results.dados.fileUri;

      setAvatarImage(avatar);
        
      toast.success("Imagem atualizada com sucesso!", {
          theme: 'light',
          autoClose: true
      });
    }
    else {
      toast.info(results.notificacoes[0].mensagem, {
        theme: 'light',
        autoClose: true
      });
    }
  },
  (error) => {
    console.error(error.message);
    
    toast.error("Ops, Falha ao atualizar imagem", {
      theme: 'light',
      autoClose: true
    });
  }

).catch((error) => {
    console.error(error.message);

    toast.error("Ops, Falha ao atualizar imagem!", {
      theme: 'light',
      autoClose: true
    });
  })
};
// -- FUNCTIONS

return (values != null ? (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Dados básicos ✨</h2>
        {/* IziToast */}
        <ToastContainer className="toast-position"></ToastContainer>
        {/* Picture */}
        <section>
            <div className="relative bg-gradient-to-r from-indigo-500 to-indigo-200 font-bold p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
                {/* Background illustration */}
                <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
                  <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                      <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                      <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                      <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                        <stop stopColor="#A5B4FC" offset="0%" />
                        <stop stopColor="#818CF8" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                        <stop stopColor="#4338CA" offset="0%" />
                        <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="rotate(64 36.592 105.604)">
                        <mask id="welcome-d" fill="#fff">
                          <use xlinkHref="#welcome-a" />
                        </mask>
                        <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                        <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
                      </g>
                      <g transform="rotate(-51 91.324 -105.372)">
                        <mask id="welcome-f" fill="#fff">
                          <use xlinkHref="#welcome-e" />
                        </mask>
                        <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                        <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
                      </g>
                      <g transform="rotate(44 61.546 392.623)">
                        <mask id="welcome-h" fill="#fff">
                          <use xlinkHref="#welcome-g" />
                        </mask>
                        <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                        <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
                      </g>
                    </g>
                  </svg>
                </div>

                {/* Content */}
                <div className="relative">
                <div className="flex items-center">
                <ul>
                  <img data-tip="Clique no <b>(+)</b> para adicionar uma nova imagem!" className="border-4 border-white-500 w-15 h-20 rounded-full" src={avatarImage} width="80" height="80" alt="User upload" />
                  <label htmlFor="image" style={{ bottom: "2vh", left: "5vh", position: "relative", cursor: "pointer" }} className="flex justify-center items-center w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-slate-300 color-primary shadow-sm transition duration-150 ml-2">
                    {/* Tooltip */}
                    <ReactTooltip html place='right' border type="light" effect='solid' />
                    <input accept='image/*' onChange={changeImage} name="image" type="file" id="image" hidden />
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                  </label>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Base Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Suas informações</h2>
          <div className="text-sm">Informe seus dados pessoais nos campos abaixo. Preste atenção ao preencher as informações!</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/2">  
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input id="firstName" onChange={onChange} value={values.firstName} name="firstName" className="form-input w-full pl-9" type="text" />
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input id="lastName" onChange={onChange} value={values.lastName} name="lastName" className="form-input w-full pl-9" type="text" />
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">  
              <label className="block text-sm font-medium mb-1" htmlFor="username">Nome de usuario<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input id="username" onChange={onChange} value={values.username} name="username" className="form-input w-full pl-9" type="text" />
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="password">Senha Atual<span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input id="currentPassword" onChange={onChange} value={values.currentPassword} name="currentPassword" className="form-input w-full pl-9" type={showPassword ? "text" : "password"} />
                  <button style={{ cursor: "pointer" }} onClick={() => (setShowPassword((current) => !current))} className="absolute inset-0 right-auto group" aria-label="show">
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
              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="password">Nova Senha<span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input id="password" onChange={onChange} value={values.password} name="password" className="form-input w-full pl-9" type={showPassword ? "text" : "password"} />
                  <button style={{ cursor: "pointer" }} onClick={() => (setShowPassword((current) => !current))} className="absolute inset-0 right-auto group" aria-label="show">
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
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">  
              <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Celular<span className="text-rose-500">*</span></label>
              <div className="relative">
                <InputMask mask={'+99(99)99999-9999'} onChange={onChange} value={values.phoneNumber} id="phoneNumber" name='phoneNumber' className="form-input w-full pl-9" type="phoneNumber" placeholder='+99(99)99999-9999' autoComplete="on"/>
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-500 ml-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="email">E-mail<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input id="email" onChange={onChange} value={values.email} name="email" className="form-input w-full pl-9" type="text" />
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-500 ml-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="role">Status<span className="text-rose-500">*</span></label>
                <div className="relative">
                  <select onChange={onChange} value={values.status} id="status" type="number" name='status' className="form-select w-full pl-9">
                    <option value={1}>Ativo</option>
                    <option value={0}>Inativo</option>
                  </select>
                  <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                      <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                    </svg>
                  </div>
                </div>
            </div>         
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="role">Sexo<span className="text-rose-500">*</span></label>
              <div className="relative">
                <select onChange={onChange} value={values.gender} id="gender" type="number" name='gender' className="form-input w-full pl-9">
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
              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="cpf">Cadastro de Pessoas Física<span className="text-rose-500">*</span></label>
                <div className="relative">
                  <InputMask mask={'999.999.999-99'} onChange={onChange} value={values.cpf} id="cpf" name='cpf' className="form-input w-full pl-9" type="text" placeholder='xxx.xxx.xxx-xx' autoComplete="on" />
                  <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                      <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="sm:w-1/3">
                <label className="block text-sm font-medium mb-1" htmlFor="rg">Registro geral<span className="text-rose-500">*</span></label>
                <div className="relative">
                  <InputMask mask={'99.999.999-9'} onChange={onChange} value={values.rg} id="rg" name='rg' className="form-input w-full pl-9" type="text" placeholder='xx.xxx.xxx-x' autoComplete="on" />
                  <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                      <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                    </svg>
                  </div>
                </div>
              </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="birthday">Aniversário<span className="text-rose-500">*</span></label>
              <div className="relative">
                <InputMask mask={"99/99/9999"} id="birthDay" onChange={onChange} value={values.birthDay} name="birthDay" className="form-input w-full pl-9" placeholder='01/01/0001' type="text"/>
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:w-1/5">
              <label className="block text-sm font-medium mb-1" htmlFor="age">Idade<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input disabled id="age" onChange={onChange} value={values.age} name="age" className="form-input w-full pl-9 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"  type="text" />
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> 
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <Link to={`/community/users-tiles`} className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancelar</Link>
            {
              !loading ? (<button id='btnSave' onClick={update} className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-3">Salvar</button>) :  (<button id='btnSave' onClick={update} disabled className="btn bg-gradient-primary-500 text-white disabled:cursor-not-allowed ml-3">
                <lord-icon
                  src="https://cdn.lordicon.com/yiniatmi.json"
                  trigger="loop"
                  colors="primary:#ffffff"
                  style={{width:67,height:20}}>
                </lord-icon>
              </button>)
            }
          </div>
        </div>
      </footer>
    </div>
  ) :  
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5"><PlaceholderLoading shape='rect' width={"100%"} height={"35px"}/></h2>
        <section>
          <div className="flex items-center">
            <ul>
            <PlaceholderLoading shape='circle' width={80} height={80}/>
            </ul>
          </div>
        </section>
        {/* Base Profile */}
        <section>
        <h2 className="text-xl leading-snug text-slate-800 font-bold"><PlaceholderLoading shape='rect' width={"100%"} height={"28px"} /></h2>
          <div className="text-sm"> <PlaceholderLoading shape='rect' width={"100%"} height={"22px"} /></div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <div className="sm:w-1/3">
             <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />  
            </div>
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/3">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/3">
              {/* Nada aqui */}
            </div>
          </div>
        </section>
      </div> 
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <PlaceholderLoading shape='rect' width={"80"} height={"38px"} />
            <PlaceholderLoading shape='rect' width={"80"} height={"38px"} />
          </div>
        </div>
      </footer>
  </div>
  )
}

export default AccountPanel;