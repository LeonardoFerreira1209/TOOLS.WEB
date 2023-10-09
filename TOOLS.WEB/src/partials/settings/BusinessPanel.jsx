// -- REACT --
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from "../../components/store/context/UserContext";
import PlaceholderLoading from 'react-placeholder-loading'

// -- TOASTIFY --
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// -- TOOTIP --
import { Tooltip } from 'react-tooltip';

// -- IMAGES --
import businessImage from '../../assets/images/—Pngtree—technology 2 5d gradient computer_4118115.jpg';
import { Link } from 'react-router-dom';

function BusinessPanel({ props }) {
  // -- CONTS
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState();
  const [avatarImage, setAvatarImage] = useState()
  // -- CONTEXT
  const { user } = useContext(StoreContext)
 // -- CONTS

 // -- FUNCTIONS
 useEffect(() => {
  fetch(`${process.env.BASE_URL}gateway/person/get/${user.tokenObj.personId}`, 
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
          id: userResult.dados.id,
          userId: userResult.dados.userId,
          firstName: userResult.dados.firstName !== null && userResult.dados.firstName,
          lastName: userResult.dados.lastName !== null && userResult.dados.lastName,
          age: userResult.dados.age !== null && userResult.dados.age,
          birthDay: userResult.dados.birthDay,
          gender: userResult.dados.gender,
          image: userResult.dados.image !== null ? "data:" + userResult.dados.image.contentType + ";base64," + userResult.dados.image.fileContents : "",
          imageByte: userResult.dados.image && userResult.dados.image.fileContents,
          rg: userResult.dados.rg !== null && userResult.dados.rg,
          cpf: userResult.dados.cpf !== null && userResult.dados.cpf,
          status: userResult.dados.status,
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

   fetch(`${process.env.BASE_URL}gateway/person/completeregister`, 
   {
      crossDomain:true,
      mode:'cors', 
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.tokenJwt}`
      },
      body: JSON.stringify({
        Id: values.id,
        UserId: values.userId,
        FirstName: values.firstName,
        LastName: values.lastName,
        Gender: values.gender,
        Rg: values.rg,
        Cpf: values.cpf,
        Age: values.age,
        Birthday: values.birthDay,
        status: values.status,
        image: values.imageByte
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
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Dados profissionais ✨</h2>
        {/* IziToast */}
        {/* <ToastContainer className="toast-position"></ToastContainer> */}
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <ul>
            <img data-tip="Clique para adicionar uma nova imagem!" className="w-15 h-20 rounded-full" src={businessImage} width="80" height="80" alt="User upload" />
            <label htmlFor="image" style={{ bottom: "2vh", left: "5vh", position: "relative", cursor: "pointer" }} className="flex justify-center items-center w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-slate-300 color-primary shadow-sm transition duration-150 ml-2">
              <Tooltip place='right' border type="light" effect='solid' />
              <input accept='image/*' onChange={""} name="image" type="file" id="image" hidden />
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            </label>
            </ul>
          </div>
        </section>
        {/* Business Profile */}
        <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Dados das profissões</h2>
            <div className="text-sm">Informe os dados dos trabalhos prestados & de sua profissão.</div>
                <>
                  <div key={""} className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Nome</label>
                      <input id="name" value={""} className="form-input w-full" type="text" />
                    </div>
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="business-id">Profissão ID</label>
                      <input id="business-id" value={""} className="form-input w-full" type="text" />
                    </div>
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                      <input id="location" className="form-input w-full" type="text" />
                    </div>
                  </div>
                  <div className="sm:w-3/3 mt-5">
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Descrição</label>
                      <input id="name" value={""} className="form-input w-full" type="text" />
                    </div>
                </>
        </section> 
        {/* Email */}
      {/*  <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Email</h2>
          <div className="text-sm">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.</div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">Business email</label>
              <input id="email" className="form-input" type="email" />
            </div>
            <button className="btn border-slate-200 hover:border-slate-300 shadow-sm color-primary">Change</button>
          </div>
        </section> */}
        {/* Password */}
      {/*   <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Password</h2>
          <div className="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
          <div className="mt-5">
            <button className="btn border-slate-200 shadow-sm color-primary">Set New Password</button>
          </div>
        </section> */}
        {/* Smart Sync */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Smart Sync update for Mac</h2>
          <div className="text-sm">With this update, online-only files will no longer appear to take up hard drive space.</div>
          <div className="flex items-center mt-5">
            <div className="form-switch">
              <input type="checkbox" id="toggle" className="sr-only" checked={sync} onChange={() => setSync(!sync)} />
              <label className="bg-slate-400" htmlFor="toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Enable smart sync</span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">{sync ? 'On' : 'Off'}</div>
          </div>
        </section>
        */}
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
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
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

export default BusinessPanel;