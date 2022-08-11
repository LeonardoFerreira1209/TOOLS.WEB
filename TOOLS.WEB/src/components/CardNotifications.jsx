function CardNotifications(notify){

  return(
      <li id={notify.id} className="border-b border-slate-200 last:border-0">
        <div to="#" className="block py-2 px-4 hover:bg-slate-50">
            <span className="block text-sm mb-2">📣 <span className="font-medium text-slate-800">{notify.theme}</span><br/>{notify.message}</span>
            <div className="grid grid-cols-2">
              <span className="block text-xs font-medium text-slate-400">{notify.date}</span>
              <div className="text-right">
                <a className="block text-xs font-medium text-slate-400" href="#0">Verificar -&gt;</a>
              </div>
            </div>
        </div>
      </li>
  )
}

export default CardNotifications;
