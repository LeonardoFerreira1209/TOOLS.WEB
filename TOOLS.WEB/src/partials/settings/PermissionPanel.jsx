// -- REACT --
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from "../../components/store/context/ContextUser";
import PlaceholderLoading from 'react-placeholder-loading';
import { getRoles }  from '../../shared/services/userService';
import ModalBasic from '../../components/ModalBasic';

// -- TOASTIFY --
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function PermissionPanel({ props }) {

const [basicModalOpen, setBasicModalOpen] = useState(false);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [roles, setRoles] = useState([]);
const { user } = useContext(StoreContext)

useEffect(() => {
  debugger
  getRoles(user.tokenJwt, setRoles, setError, setLoading);

}, [])

return (/*values != null*/ true ? (
    <div className="grow">
      <ModalBasic id="basic-modal" modalOpen={basicModalOpen} setModalOpen={setBasicModalOpen} title="Basic Modal">
        {/* Modal content */}
        <div className="px-5 pt-4 pb-1">
          <div className="text-sm">
            <div className="font-medium text-slate-800 mb-2">Let’s Talk Paragraph</div>
            <div className="space-y-2">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setBasicModalOpen(false); }}>Close</button>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">I Understand</button>
          </div>
        </div>
      </ModalBasic>
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Roles e Permissões ✨</h2>
        {/* IziToast */}
        <ToastContainer className="toast-position"></ToastContainer>
        { /* Roles */ }
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Suas permissões</h2>
          {
            !user.tokenObj.role.includes("administrator") ? (
              <>
                <div className="text-sm">Vejá suas permissões e roles abaixo!</div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
                  <div className="sm:w-1/2">  
                    <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <input id="firstName" name="firstName" className="form-input w-full pl-9" type="text" />
                      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                        <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 ml-3 mr-2" viewBox="0 0 16 16">
                          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 text-sm">Abaixo estão todas as informações das roles do sistema para visualizar e editar!</div>
                {
                  roles.map(role => (
                    <div key={role.name} className="p-4 flex flex-col col-span-12 sm:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
                      <div className="px-5 pt-5">
                        <header className="flex justify-between items-start mb-2">
                          { /* Total users */ }
                          <span className='font-medium'>Total {role.plans[0]?.users?.length} usuário(s)</span>

                          {/* Avatar users */}
                          <ul className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
                            {
                              role.plans?.map(plan => plan.users?.map(user => (
                                <li key={user.username}>
                                  <span className="block">
                                    <img className="w-7 h-7 rounded-full" src={user.imageUri} alt="User 01" />
                                  </span>
                                </li>
                              )))
                            }
                            <li>
                              <button className="flex justify-center items-center w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-slate-300 color-primary shadow-sm transition duration-150 ml-2">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                </svg>
                              </button>
                            </li>
                          </ul>
                        </header>
                        <h2 className="uppercase text-lg font-bold text-slate-800 mb-2">{role.name}</h2>
                        <div onClick={(e) => { e.stopPropagation(); setBasicModalOpen(true); }} className="cursor-pointer text-xs font-semibold text-slate-400 hover:text-indigo-600 uppercase mb-1">Editar role</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </section>
      </div> 
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <Link to={`/community/users-tiles`} className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancelar</Link>
            {
              !loading ? (<button id='btnSave' className="btn text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-500 ml-3">Salvar</button>) :  (<button id='btnSave' disabled className="btn bg-gradient-primary-500 text-white disabled:cursor-not-allowed ml-3">
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