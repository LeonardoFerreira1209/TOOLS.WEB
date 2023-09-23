import React, { useRef, useState } from 'react';

function MessagesFooter({
  sendMessage
}) {
  const [message, setMessage] = useState("");
  const buttonRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      buttonRef.current.click();
    }
  };

  return (
    <div className="sticky bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        {/* Plus button */}
        <button className="shrink-0 text-slate-400 hover:text-slate-500 mr-3">
          <span className="sr-only">Adicionar</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
          </svg>
        </button>
        {/* Message input */}
        <div onKeyDown={handleKeyDown} className="grow flex">
          <div className="grow mr-3">
            <label htmlFor="message-input" className="sr-only">Escreva uma mensagem</label>
            <input value={message || ""} onChange={(event) => setMessage(event.target.value)} id="message-input" className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300" type="text" placeholder="Aa" />
          </div>
          <button ref={buttonRef} onClick={() => message.length > 0 && sendMessage(message).then(() => {
            setMessage(null);
          })} className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">Enviar -&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default MessagesFooter;
