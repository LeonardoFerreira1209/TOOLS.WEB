import React, { useContext, useState } from 'react';
import StoreContext from "../../components/store/context/ContextUser";

import InputMask from 'react-input-mask';

import FemaleAvatar from '../../images/—Pngtree—smiling people avatar set different_7691478.png';
import MaleAvatar from '../../images/—Pngtree—smiling people avatar set different_7690723.png';


function AccountPanel({ person }) {

  // -- CONTS
  //const [sync, setSync] = useState(false);
  const avatarImage = person.image === "" ? person.gender == 2 ? FemaleAvatar : MaleAvatar : person.image;
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // -- CONTEXT
  const { user } = useContext(StoreContext)
 // -- CONTS
 
  // // -- VALIDATES
  // const [ firstNameValidate, setFirstNameValidate ] = useState(false);
  // const [ lastNameValidate, setLastNameValidate ] = useState(false);
  // const [ userValidate, setUserValidate ] = useState(false);
  // const [ passwordValidate, setPasswordValidate ] = useState(false);
  // const [ emailValidate, setEmailValidate ] = useState(false);
  // const [ phoneNumberValidate, setPhoneNumberValidate ] = useState(false);
  // const [ cpfValidate, setCPFValidate ] = useState(false);

  // useEffect(() => {
  //   values.firstName === "" ? setFirstNameValidate(false) : setFirstNameValidate(true);
  //   values.lastName === "" ? setLastNameValidate(false) : setLastNameValidate(true);
  //   values.username === "" ? setUserValidate(false) : setUserValidate(true);
  //   values.password === "" ? setPasswordValidate(false) : setPasswordValidate(true);
  //   values.email === "" ? setEmailValidate(false) : setEmailValidate(true);
  //   values.phoneNumber === "" ? setPhoneNumberValidate(false) : setPhoneNumberValidate(true);
  //   values.cpf === "" ? setCPFValidate(false) : setCPFValidate(true);

  // }, [values]);

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
      status: person.status
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
        status: values.status
      })
    })
    .then(response => response.json()).then((results) => {
        if(results.sucesso){
          setLoading(false);
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
 // -- FUNCTIONS

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Dados pessoais</h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <img className="w-20 h-20 rounded-full" src={avatarImage} width="80" height="80" alt="User upload" />
            </div>
            <button className="btn-sm bg-gradient-primary-500 text-white">Mudar</button>
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
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Idade</label>
              <input id="age" onChange={onChange} value={values.age} name="age" className="form-input w-full" placeholder='18' type="number" min="18" max="90" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="cpf">Cadastro de Pessoas Física<span className="text-rose-500">*</span></label>
              <InputMask mask={'999.999.999-99'} onChange={onChange} value={values.cpf} id="cpf" name='cpf' className="form-input w-full" type="text" placeholder='xxx.xxx.xxx-xx' autoComplete="on" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="rg">Registro geral</label>
              <InputMask mask={'99.999.999-9'} onChange={onChange} value={values.rg} id="rg" name='rg' className="form-input w-full" type="text" placeholder='xx.xxx.xxx-x' autoComplete="on" />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">Aniversário</label>
              <InputMask mask={"99/99/9999"} id="birthDay" onChange={onChange} value={values.birthDay} name="birthDay" className="form-input w-full" placeholder='01/01/0001' type="text"/>
            </div>
            <div className="sm:w-1/3">
            <label className="block text-sm font-medium mb-1" htmlFor="role">Status</label>
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