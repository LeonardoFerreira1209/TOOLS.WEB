import React from 'react';

function ChatBotFooter() {
  return (
    <div className="sticky bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        {/* Message input */}
        <form className="grow flex">
          <div className="grow mr-3">
            <label htmlFor="message-input" className="sr-only">Digite uma mensagem</label>
            <input id="message-input" className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300" type="text" placeholder="Aa" />
          </div>
          <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">Enviar -&gt;</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBotFooter;
