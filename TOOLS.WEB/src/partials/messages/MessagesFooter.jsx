import React, { useRef, useState, useEffect } from 'react';
import Transition from '../../shared/utils/Transition';
import Options from './menu-blocks/Options';

function MessagesFooter({ sendMessage }) {
  const [message, setMessage] = useState({
    message: '',
    file: null
  });

  const [preview, setPreview] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showCommandOptions, setShowCommandOptions] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [commands, setCommands] = useState(null);

  const textareaRef = useRef(null);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const dropdownCommands = useRef(null);

  const coomandsOptions = [
    { 
      command: '>GPT', 
      title: 'Envia uma pergunta para o CHATGPT e retorna uma resposta!'
    },
    { 
      command: '>DALLE', 
      title: 'Envia um prompt para o DALLE e retorna uma imagem!'
    }
  ];

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(message);
      setMessage({
        ...message,
        ['message']: '',
        ['file']: null
      });
    }
  };

  const onChange = (event) => {
    let value = event.target.value;
    const regex = /^>[^\s]+$/;

    if(value === ">" || regex.test(value)){
      value = value.toUpperCase();
      setCommands(coomandsOptions.filter(command => command.command.startsWith(value)));
      setShowOptions(false);
      setShowCommandOptions(true);
    } else setShowCommandOptions(false);

    setMessage({
      ...message,
        ['message']: value
    });
  };

  return (
    <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
      <div className="flex items-end">
        {/* Plus button */}
        <div className="flex flex-grow items-center ml-8 mr-5">
          <div className='relative inline-flex'>
            <button  ref={trigger} onClick={() => setShowOptions((prev) => !prev)} className="mr-4 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Adicionar</span>
              <svg className="w- h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
              </svg>
            </button>
            {/* Options block */}
            <Options
              preview={preview}
              setPreview={setPreview}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              setShowImage={setShowImage}
              message={message}
              setMessage={setMessage}
              dropdownRef={dropdown}
            />
          </div>
          {/* Message input */}
          <textarea
            ref={textareaRef}
            value={message.message}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            autoFocus={true}
            className="flex-grow p-2 border rounded-md focus:outline-none focus:border-indigo-300 focus:z-10 resize-none overflow-hidden"
            placeholder="Aa"
          />
          {/* Commands Options block */}
          <Transition
            className={`z-50 origin-bottom absolute bottom-full w-full bg-white dark:bg-slate-800 border border-b-0 border-slate-200 dark:border-slate-700 py-1.5 rounded overflow-hidden mt-1`}
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
                        <button onClick={() => { setMessage({
                          ...message,
                          ['message']: object.command.concat(" ")
                        }), seCom(false) }} type='button' className='btn col-span-6 hover:text-indigo-500'>
                          {object.command}
                        </button>
                        <span>{object.title}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Transition>
          {/* Image blocks */}
          <Transition
            className={`origin-bottom absolute bottom-full w-full bg-white dark:bg-slate-800 border border-b-0 border-slate-200 dark:border-slate-700 py-1.5 rounded overflow-hidden mt-1`}
            show={showImage}
            enterStart="opacity-0 -translate-x-1"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <div style={{overflow: "auto"}} className="max-h-50"
                ref={dropdownCommands}
                onFocus={() => setShowImage(true)}
                onBlur={() => setShowImage(false)}
              >
              <div className="grid grid-flow-row gap-2 justify-between">
                {
                  preview !== null && (
                    <div className="h-60">
                      <embed className="w-full h-60 p-3 left-7 relative" src={preview} type={message?.file?.type} />
                    </div>
                  )
                }
              </div>
            </div>
          </Transition>
        </div>
        {/* Send button */}
        <button
          onClick={() => (message.message.length > 0 || message.file !== null) && (sendMessage(message), setMessage({
            ...message,
            ['message']: '',
            ['file']: null
          }), setShowOptions(false))}
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap px-4 py-2 rounded-md"
        >
          Enviar -&gt;
        </button>
      </div>
    </div>
  );
}

export default MessagesFooter;
