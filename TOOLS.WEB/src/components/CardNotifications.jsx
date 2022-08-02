import { useState } from "react";
import { Link } from "react-router-dom";

function CardNotifications(notify){

    const [dropdownOpen, setDropdownOpen] = useState();

    return(
        <li key={notify.id} className="border-b border-slate-200 last:border-0">
          <Link
              className="block py-2 px-4 hover:bg-slate-50"
              to="#0"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="block text-sm mb-2">📣 <span className="font-medium text-slate-800">Edit your information in a swipe</span>{notify.message}</span>
              <span className="block text-xs font-medium text-slate-400">{notify.date}</span>
           </Link>
        </li>
    )
}

export default CardNotifications;
