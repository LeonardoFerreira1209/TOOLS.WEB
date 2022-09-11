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

function AccountPanel({ props }) {

// -- CONTS
const [loading, setLoading] = useState(false);
const [values, setValues] = useState();
const [avatarImage, setAvatarImage] = useState()
// -- CONTEXT
const { user } = useContext(StoreContext)
// -- CONTS

// -- FUNCTIONS
 useEffect(() => {
  fetch(`https://localhost:7125/api/Person/get/${props.id}`, {
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
    .then(response => response.json()).then((personResult) => {
        setValues({
          id: personResult.dados.id,
          userId: personResult.dados.userId,
          firstName: personResult.dados.firstName !== null && personResult.dados.firstName,
          lastName: personResult.dados.lastName !== null && personResult.dados.lastName,
          age: personResult.dados.age !== null && personResult.dados.age,
          birthDay: personResult.dados.birthDay,
          gender: personResult.dados.gender,
          image: personResult.dados.image !== null ? "data:" + personResult.dados.image.contentType + ";base64," + personResult.dados.image.fileContents : "",
          imageByte: personResult.dados.image && personResult.dados.image.fileContents,
          rg: personResult.dados.rg !== null && personResult.dados.rg,
          cpf: personResult.dados.cpf !== null && personResult.dados.cpf,
          status: personResult.dados.status,
        });

        setAvatarImage(personResult.dados.image.fileContents === "" ? person.gender == 2 ? FemaleAvatar : MaleAvatar : personResult.dados.image !== null ? "data:" + personResult.dados.image.contentType + ";base64," + personResult.dados.image.fileContents : "",);
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

  fetch("https://localhost:7125/api/person/completeRegister", {
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

function changeImage(event) {
const formData = new FormData();

formData.append('File', event.target.files[0]);

fetch(`https://localhost:7125/api/person/profileImage/${values.id}`, { 
  method: 'PATCH',
  headers: { 
    'Authorization': `Bearer ${user.tokenJwt}`
  },
  body: formData,
  dataType: "jsonp"
  })
  .then(response => response.json()).then((results) => {
    if(results.sucesso) {
      const avatar = "data:" + results.dados.contentType + ";base64," + results.dados.fileContents;

      setValues(
        {...values, 
          ["imageByte"]: results.dados.fileContents
        });

      setAvatarImage(avatar);
        
      toast.success("Imagem salva com sucesso!", {
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
    
    toast.error("Ops, Falha ao salvar imagem", {
      theme: 'light',
      autoClose: true
    });
  }

).catch((error) => {
    console.error(error.message);

    toast.error("Ops, Falha ao salvar imagem!", {
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
          <div className="flex items-center">
            <ul>
            <img data-tip="Clique no <b>(+)</b> para adicionar uma nova imagem!" className="w-15 h-20 rounded-full" src={avatarImage} width="80" height="80" alt="User upload" />
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
        </section>
        {/* Base Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Suas informações</h2>
          <div className="text-sm">Informe seus dados pessoais nos campos abaixo. Preste atenção ao preencher as informações!</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">  
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
            <div className="sm:w-1/3">
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
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="age">Idade<span className="text-rose-500">*</span></label>
              <div className="relative">
                <input id="age" onChange={onChange} value={values.age} name="age" className="form-input w-full pl-9" placeholder='18' type="number" min="18" max="90" />
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
            <div className="sm:w-1/3"> {/* Nada aqui */}  </div>
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