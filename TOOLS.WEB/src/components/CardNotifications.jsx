function CardNotifications(notify){

  let icon;

  switch(notify.icon) {
    case 1:
      icon = (
        <lord-icon
            src="https://cdn.lordicon.com/wzffrbuw.json"
            trigger="loop"
            colors="outline:#121331,primary:#3a3347,secondary:#ffc738"
            style={{width:'30px', height:'30px'}}>
        </lord-icon>  
      );
      break;
    case 2:
      icon = (
        <lord-icon
            src="https://cdn.lordicon.com/pfdjiokz.json"
            trigger="loop"
            delay="0"
            colors="primary:#ebe6ef,secondary:#f24c00,tertiary:#4bb3fd"
            style={{width:'30px', height:'30px', position:'relative', bottom: '2px'}}>
        </lord-icon>
      );
      break;
    case 3:
      icon = (
        <lord-icon
            src="https://cdn.lordicon.com/inrunzby.json"
            trigger="loop"
            delay="0"
            colors="primary:#ffc738,secondary:#c71f16"
            style={{width:'30px', height:'30px', position:'relative', bottom: '2px'}}>
        </lord-icon>
      );
      break;
    case 4: 
      icon = (
        <lord-icon
          src="https://cdn.lordicon.com/tqywkdcz.json"
          trigger="loop"
          delay="0"
          colors="primary:#4bb3fd,secondary:#f28ba8,tertiary:#ffc738,quaternary:#f24c00"
          style={{width:'30px', height:'30px', position:'relative', bottom: '5px'}}>
        </lord-icon>
      );
      break;
    case 5: 
      icon = (
        <lord-icon
          src="https://cdn.lordicon.com/utrgcepa.json"
          trigger="loop"
          delay="100"
          colors="primary:#3a3347,secondary:#4bb3fd"
          style={{width:'30px', height:'30px', position:'relative', bottom: '2px'}}>
        </lord-icon>
      );
      break;
  }

  return(
      <li id={notify.id} className="border-b border-slate-200 dark:border-slate-700 last:border-0">
        <div to="#" className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20">
            <span className="block text-sm mb-2">
            { icon }<span className="font-medium text-slate-800 dark:text-slate-100">{notify.description}</span><br/>{notify.message}</span>
            <div className="grid grid-cols-2">
              <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">{notify.date}</span>
              <div className="text-right">
                <a className="block text-xs font-medium text-slate-400" href="#0">Verificar -&gt;</a>
              </div>
            </div>
        </div>
      </li>
  )
}

export default CardNotifications;
