// -- REACT --
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from "../../components/store/context/ContextUser";
import PlaceholderLoading from 'react-placeholder-loading'

// -- TOASTIFY --
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// -- TOOTIP --
import ReactTooltip from 'react-tooltip';

// -- INPUTMASK --
import InputMask from 'react-input-mask';

// -- IMAGES --
import FemaleAvatar from '../../images/—Pngtree—smiling people avatar set different_7691478.png';
import MaleAvatar from '../../images/—Pngtree—smiling people avatar set different_7690723.png';
import { Link } from 'react-router-dom';

function UserPanel({ props }) {

// -- CONTS
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [values, setValues] = useState();
const [avatarImage, setAvatarImage] = useState()
// -- CONTEXT
const { user } = useContext(StoreContext)
// -- CONTS

// -- FUNCTIONS
useEffect(() => {
  fetch(`https://toolsuserapi.azurewebsites.net/api/Person/get/${props.id}`, 
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
  .then(response => response.json()).then((userResult) => {
      setValues({
        UserId: userResult.dados.userId,
        firstName: userResult.dados.firstName !== null && userResult.dados.firstName,
        lastName: userResult.dados.lastName !== null && userResult.dados.lastName,
        image: userResult.dados.image !== null ? "data:" + userResult.dados.image.contentType + ";base64," + userResult.dados.image.fileContents : "",
        username: userResult.dados.user.userName,
        email: userResult.dados.user.email,
        emailConfirmed: userResult.dados.user.emailConfirmed,
        phoneNumber: userResult.dados.user.phoneNumber,
        phoneNumberConfirmed: userResult.dados.user.phoneNumberConfirmed,
        lockoutEnabled : userResult.dados.user.lockoutEnabled,
        lockoutEnd: userResult.dados.user.lockoutEnd,
        securityStamp: userResult.dados.user.securityStamp,
        concurrencyStamp: userResult.dados.user.concurrencyStamp,
        twoFactorEnabled: userResult.dados.user.twoFactorEnabled,
        accessFailedCount: userResult.dados.user.accessFailedCount
      });

      setAvatarImage(userResult.dados.image.fileContents === "" ? person.gender == 2 ? FemaleAvatar : MaleAvatar : userResult.dados.image !== null ? "data:" + userResult.dados.image.contentType + ";base64," + userResult.dados.image.fileContents : "",);
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

  fetch(`https://toolsuserapi.azurewebsites.net/api/user/update`, 
  {
    crossDomain:true,
    mode:'cors', 
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.tokenJwt}`
    },
    body: JSON.stringify({
      Id: values.UserId,
      FirstName: values.firstName,
      LastName: values.lastName,
      UserName: values.username,
      CurrentPassword: values.currentPassword,
      Password: values.password,
      Email: values.email,
      EmailConfirmed: values.emailConfirmed,
      PhoneNumber: values.phoneNumber,
      PhoneNumberConfirmed: values.phoneNumberConfirmed,
      LockoutEnabled: values.lockoutEnabled,
      LockoutEnd: values.lockoutEnd,
      SecurityStamp: values.securityStamp,
      ConcurrencyStamp: values.concurrencyStamp,
      TwoFactorEnabled: values.twoFactorEnabled,
      AccessFailedCount: values.accessFailedCount
    })
  })
  .then(response => response.json()).then((results) => {
      if(results.sucesso) {
        toast.success("Edição feita com sucesso!", {
          theme: 'light',
          autoClose: true
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
// -- FUNCTIONS

return (values != null ? (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Dados Condifênciais ✨</h2>
        {/* IziToast */}
        <ToastContainer className="toast-position"></ToastContainer>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <ul>
              <img data-tip="Clique no <b>(+)</b> para adicionar uma nova imagem!" className="w-15 h-20 rounded-full" src={avatarImage} width="80" height="80" alt="User upload" />
            </ul>
          </div>
        </section>
        {/* Base Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Suas informações</h2>
          <div className="text-sm">Informe seus dados condifênciais nos campos abaixo. Preste atenção ao preencher as informações!</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/2">  
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input disabled id="firstName" onChange={onChange} value={values.firstName} name="firstName" className="form-input w-full pl-9 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed" type="text" />
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
                <input disabled id="lastName" onChange={onChange} value={values.lastName} name="lastName" className="form-input w-full pl-9 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed" type="text" />
                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/2">  
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
            <div className="sm:w-1/2">
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
          </div>
        </section>
        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/2">  
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
            <div className="sm:w-1/2">
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
          <div className="w-full mt-3">  
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
        </section>
      </div> 
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <Link to={`/community/users-tiles`} className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancelar</Link>
            {
              !loading ? (<button id='btnSave' onClick={update} className="btn bg-gradient-primary-500 text-white ml-3">Salvar</button>) :  (<button id='btnSave' onClick={update} disabled className="btn bg-gradient-primary-500 text-white disabled:cursor-not-allowed ml-3">
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
            <div className="sm:w-1/2">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/2">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <div className="sm:w-1/2">
             <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />  
            </div>
            <div className="sm:w-1/2">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/2">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
            </div>
            <div className="sm:w-1/2">
              <PlaceholderLoading shape='rect' width={"100%"} height={"64px"} />
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

export default UserPanel;