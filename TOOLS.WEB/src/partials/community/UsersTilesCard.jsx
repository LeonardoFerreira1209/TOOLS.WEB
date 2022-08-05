import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';

function UsersTilesCard(props) {
  return (
    <div id={props.id} className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col h-full">
        {/* Card top */}
        <div className="grow p-5" style={{height:200}}>
          <div className="flex justify-between items-start">
            {/* Image + name */}
            <header>
              <div className="flex mb-2">
                <Link className="relative inline-flex items-start mr-5" to={props.link}>
                  <div className="absolute top-0 right-0 -mr-2 bg-white rounded-full shadow" aria-hidden="true">
                  <lord-icon
                      src="https://cdn.lordicon.com/pzuyobdc.json"
                      trigger="morph"
                      >
                  </lord-icon>
                  </div>
                  <img className="rounded-full" src={props.image} width="64" height="64" alt={props.name} />
                </Link>
                <div className="mt-1 pr-1">
                  <Link className="inline-flex text-slate-800 hover:text-slate-900" to={props.link}>
                    <h2 className="text-xl leading-snug justify-center font-semibold">{props.name}</h2>
                  </Link>
                  <div className="flex items-center"><span className="text-sm font-medium text-slate-400 -mt-0.5 mr-1">-&gt;</span> <span>{props.office}</span></div>
                </div>
              </div>
            </header>
            {/* Menu button */}
           <EditMenu align="right" className="relative inline-flex shrink-0">
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                <lord-icon
                    src="https://cdn.lordicon.com/qjwkduhc.json"
                    trigger="morph"
                    colors="primary:#646e78,secondary:#c71f16,tertiary:#ebe6ef"
                    style={{height:20}}
                  >
                </lord-icon>
                Remove</Link>
            </li>
            </EditMenu>
          </div>
          {/* Bio */}
          <div className="mt-2">
            <div className="text-sm">{props.content.substring(0, 150) + "..."}</div>
          </div>
        </div>
        {/* Card footer */}
        <div className="border-t border-slate-200">
          <div className="flex divide-x divide-slate-200r">
            <Link className="block flex-1 text-center text-sm color-primary hover:color-primary font-medium px-3 py-4" to="/messages">
              <div className="flex items-center justify-center">
              <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                <lord-icon
                    src="https://cdn.lordicon.com/nqnkhadn.json"
                    trigger="morph"
                  >
                </lord-icon>
                <span>Enviar Email</span>
              </div>
            </Link>
            <Link className="block flex-1 text-center text-sm text-slate-600 hover:text-slate-800 font-medium px-3 py-4 group" to={`/settings/account/${props.id}`}>
              <div className="flex items-center justify-center">
                <lord-icon
                    src="https://cdn.lordicon.com/qtqvorle.json"
                    trigger="morph"
                    colors="outline:#000000,primary:#545454,secondary:#f4f19c,tertiary:#e83a30"
                    >
                </lord-icon>
                <span>Editar Perfil</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTilesCard;
