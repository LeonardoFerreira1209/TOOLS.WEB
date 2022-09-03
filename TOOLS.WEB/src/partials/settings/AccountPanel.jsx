// -- REACT --
import React, { useContext, useState } from 'react';
import StoreContext from "../../components/store/context/ContextUser";

// -- TOASTIFY --
import { ToastContainer, toast, Icons } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// -- TOOTIP --
import ReactTooltip from 'react-tooltip';

// -- INPUTMASK --
import InputMask from 'react-input-mask';

// -- IMAGES --
import FemaleAvatar from '../../images/—Pngtree—smiling people avatar set different_7691478.png';
import MaleAvatar from '../../images/—Pngtree—smiling people avatar set different_7690723.png';

function AccountPanel({ person }) {
debugger
  // -- CONTS
  //const [sync, setSync] = useState(false);
  const avatarImage = person.image === "" ? person.gender == 2 ? FemaleAvatar : MaleAvatar : person.image;
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // -- CONTEXT
  const { user } = useContext(StoreContext)
 // -- CONTS

 // -- FUNCTIONS
  function initialState() {
    return {
      id: person.id,
      firstName: person.firstName, 
      lastName: person.lastName,
      userId: person.user.id,
      rg: person.rg,
      cpf: person.cpf,
      gender: person.gender,
      birthDay: person.birthDay,
      age: person.age,
      status: person.status,
      imageByte: person.imageByte
    };
  }

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
    debugger
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
  debugger
  const formData = new FormData();

  formData.append('File', event.target.files[0]);

  fetch(`https://localhost:7125/api/person/profileImage/${values.id}`, { 
    method: 'PATCH',
    headers: { 
      'Authorization': `Bearer ${user.tokenJwt}`
    },
    body: formData,
    dataType: "jsonp"
    }).then(
      response => response.json() 
    ).then(
      success => console.log(success)
    ).catch(
      error => console.log(error)
    );
  };
 // -- FUNCTIONS

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Dados pessoais</h2>
        {/* IziToast */}
        <ToastContainer className="sm-toast-position"></ToastContainer>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <ul>
            <img data-tip="Clique para adicionar uma nova imagem!" className="w-15 h-20 rounded-full" src={avatarImage} width="80" height="80" alt="User upload" />
            <label htmlFor="image" style={{ bottom: "2vh", left: "5vh", position: "relative", cursor: "pointer" }} className="flex justify-center items-center w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-slate-300 color-primary shadow-sm transition duration-150 ml-2">
              {/* Tooltip */}
              <ReactTooltip place='right' border="true" type="light" effect='solid' />
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
          <div className="text-sm">Informe seus dados pessoais nos campos abaixo. Preste atenção ao preenher as informações!</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
              <input id="firstName" onChange={onChange} value={values.firstName} name="firstName" className="form-input w-full" type="text" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
              <input id="lastName" onChange={onChange} value={values.lastName} name="lastName" className="form-input w-full" type="text" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="role">Sexo<span className="text-rose-500">*</span></label>
              <select onChange={onChange} value={values.gender} id="gender" type="number" name='gender' className="form-select w-full">
                <option value={1}>Masculino</option>
                <option value={2}>Feminino</option>
              </select>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Idade<span className="text-rose-500">*</span></label>
              <input id="age" onChange={onChange} value={values.age} name="age" className="form-input w-full" placeholder='18' type="number" min="18" max="90" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="cpf">Cadastro de Pessoas Física<span className="text-rose-500">*</span></label>
              <InputMask mask={'999.999.999-99'} onChange={onChange} value={values.cpf} id="cpf" name='cpf' className="form-input w-full" type="text" placeholder='xxx.xxx.xxx-xx' autoComplete="on" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="rg">Registro geral<span className="text-rose-500">*</span></label>
              <InputMask mask={'99.999.999-9'} onChange={onChange} value={values.rg} id="rg" name='rg' className="form-input w-full" type="text" placeholder='xx.xxx.xxx-x' autoComplete="on" />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Aniversário<span className="text-rose-500">*</span></label>
              <InputMask mask={"99/99/9999"} id="birthDay" onChange={onChange} value={values.birthDay} name="birthDay" className="form-input w-full" placeholder='01/01/0001' type="text"/>
            </div>
            <div className="sm:w-1/3">
            <label className="block text-sm font-medium mb-1" htmlFor="role">Status<span className="text-rose-500">*</span></label>
              <select onChange={onChange} value={values.status} id="status" type="number" name='status' className="form-select w-full">
                <option value={1}>Ativo</option>
                <option value={0}>Inativo</option>
              </select>
            </div>
            <div className="sm:w-1/3">
              {/* Nada aqui */}
            </div>
          </div>
        </section>
        {/* Business Profile */}
         {/*  <section>
            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Dados das profissões</h2>
            <div className="text-sm">Informe os dados dos trabalhos prestados & de sua profissão.</div>
            {
              person.professions.map(profession => (
                <>
                  <div key={profession.id} className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Nome</label>
                      <input id="name" value={profession.office} className="form-input w-full" type="text" />
                    </div>
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="business-id">Profissão ID</label>
                      <input id="business-id" value={profession.id} className="form-input w-full" type="text" />
                    </div>
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                      <input id="location" className="form-input w-full" type="text" />
                    </div>
                  </div>
                  <div className="sm:w-3/3 mt-5">
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Descrição</label>
                      <input id="name" value={profession.description} className="form-input w-full" type="text" />
                    </div>
                </>
              ))
            }
          </section> */}
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
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancelar</button>
            <button onClick={update} className="btn bg-gradient-primary-500 text-white ml-3">
            {
              !loading ? ("Salvar") : (
                <lord-icon
                  src="https://cdn.lordicon.com/yiniatmi.json"
                  trigger="loop"
                  colors="primary:#ffffff"
                  style={{width:67,height:20}}>
                </lord-icon>
              )
            }
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;