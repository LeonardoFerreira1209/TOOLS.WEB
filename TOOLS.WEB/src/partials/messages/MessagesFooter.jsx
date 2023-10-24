import React, { useRef, useState, useEffect } from 'react';
import Transition from '../../shared/utils/Transition';
import  ghtpSvgIcon  from '../../assets/images/cdnlogo.com_chatgpt.svg'

function MessagesFooter({ sendMessage }) {
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showCommandOptions, setShowCommandOptions] = useState(false);
  const [commands, setCommands] = useState(null);

  const textareaRef = useRef(null);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const dropdownCommands = useRef(null);

  const coomandsOptions = [
    { 
      command: '>GPT', 
      title: 'Envia uma pergunta para o CHATGPT e retorna uma resposta!'},
  ];

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(message);
      setMessage('');
    }
  };

  const onChange = (event) => {
    let value = event.target.value;
    const regex = /^>[^\s]+$/;

    if(regex.test(value)){
      value = value.toUpperCase();
      setCommands(coomandsOptions.filter(command => command.command.startsWith(value)));
      setShowCommandOptions(true);
    } else setShowCommandOptions(false);
    
    setMessage(value);
  };

  return (
    <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
      <div className="flex items-end">
        {/* Plus button */}
        <div className="flex flex-grow items-center ml-8 mr-5">
          <div className='relative inline-flex'>
            <button  ref={trigger} onClick={() => setShowOptions((prev) => !prev)} className="mr-4 text-gray-400 hover:text-gray-500 mr-3">
              <span className="sr-only">Adicionar</span>
              <svg className="w- h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
              </svg>
            </button>
            {/* Options block */}
            <Transition
              className={`origin-bottom z-10 absolute bottom-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1`}
              show={showOptions}
              enterStart="opacity-0 -translate-x-1"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <div style={{overflow: "auto"}} className="max-h-80"
                  ref={dropdown}
                >
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  <div className="p-3 row-span-3">
                    <img className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded-full shadow-current shadow-sm w-100 outline hover:outline-emerald-400 outline-offset-1 ' src={ghtpSvgIcon} />
                  </div>
                  <div className="col-span-2 min-w-100 bg-stone-600">02</div>
                  <div className="row-span-2 col-span-2 min-w-100 bg-red-600">03</div>
                </div>
              </div>
            </Transition>
          </div>
          {/* Message input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border rounded-md focus:outline-none focus:border-indigo-300 resize-none overflow-hidden"
            placeholder="Aa"
          />
          {/* Commands Options block */}
          <Transition
            className={`origin-bottom absolute bottom-full w-full bg-white dark:bg-slate-800 border border-b-0 border-slate-200 dark:border-slate-700 py-1.5 rounded overflow-hidden mt-1`}
            show={showCommandOptions}
            enterStart="opacity-0 -translate-x-1"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <div style={{overflow: "auto"}} className="max-h-50"
                ref={dropdownCommands}
                onFocus={() => setShowCommandOptions(true)}
                onBlur={() => setShowCommandOptions(false)}
              >
              <div className="grid grid-flow-row gap-2 justify-between">
                {commands &&
                  commands.map((object, index) => {
                    return (
                      <div className='row' key={index}>
                        <button onClick={() => { setMessage(object.command), setShowCommandOptions(false) }} type='button' className='btn col-span-6 hover:text-indigo-500'>
                          {object.command}
                        </button>
                        <span>{object.title}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Transition>
        </div>
        {/* Send button */}
        <button
          onClick={() => message.length > 0 && (sendMessage(message), setMessage(''))}
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap px-4 py-2 rounded-md"
        >
          Enviar -&gt;
        </button>
      </div>
    </div>
  );
}

export default MessagesFooter;
