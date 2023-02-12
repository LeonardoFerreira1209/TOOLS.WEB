// -- REACT --
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from "../../components/store/context/ContextUser";
import PlaceholderLoading from 'react-placeholder-loading'

// -- TOASTIFY --
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

function PermissionPanel({ props }) {

const [loading, setLoading] = useState(false);
const [values, setValues] = useState();
const { user } = useContext(StoreContext)

return (/*values != null*/ true ? (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Permissões do usuário ✨</h2>
        {/* IziToast */}
        <ToastContainer className="toast-position"></ToastContainer>
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