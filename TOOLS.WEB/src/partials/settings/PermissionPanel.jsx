// -- REACT --
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from "../../components/store/context/ContextUser";
import PlaceholderLoading from 'react-placeholder-loading'

// -- TOASTIFY --
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

function PermissionPanel({ props }) {

// -- CONTS
const [loading, setLoading] = useState(false);
const [values, setValues] = useState();
// -- CONTEXT
const { user } = useContext(StoreContext)
// -- CONTS

// -- FUNCTIONS
useEffect(() => {
  fetch(`${process.env.BASE_URL}/api/Person/get/${props.id}`, 
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

  fetch("${process.env.BASE_URL}api/user/update", {
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
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Permissões do usuário ✨</h2>
        {/* IziToast */}
        <ToastContainer className="toast-position"></ToastContainer>
        {/* Base Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Suas permissões</h2>
          <div className="text-sm">Configure as permissões dos usuários!</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/2">  
              
            </div>
            <div className="sm:w-1/2">
              
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

export default PermissionPanel;