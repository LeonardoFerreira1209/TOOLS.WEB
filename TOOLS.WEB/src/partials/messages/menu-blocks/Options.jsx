import { useState } from "react";
import Transition from "../../../shared/utils/Transition";

function Options({
    showOptions,
    setShowOptions,
    message,
    setMessage,
    dropdownRef
}){
    const [activeTab, setActiveTab] = useState('emojis');
    const [preview, setPreview] = useState(null);
    const emojis = [
        '😀', '😃', '😄', '😁',
        '😆', '😅', '😂', '🤣',
        '🥲', '🥹', '☺️', '😊',
        '😇', '🙂', '🙃', '😉',
        '😌', '😍', '🥰', '😘',
        '😗', '😙', '😚', '😋',
        '😛', '😝', '😜', '🤪',
        '🤨', '🧐', '🤓', '😎',
        '🥸', '🤩', '🥳', '😏',
        '😒', '😞', '😔', '😟',
        '😕', '🙁', '☹️', '😣',
        '😖', '😫', '😩', '🥺',
        '😢', '😭', '😮‍💨', '😤',
        '😠', '😡', '🤬', '🤯',
        '😳', '🥵', '🥶', '😱',
        '😨', '😰', '😥', '😓',
        '🫣', '🤗', '🫡', '🤔',
        '🫢', '🤭', '🤫', '🤥',
        '😶', '😶‍🌫️', '😐', '😑',
        '😬', '🫨', '🫠', '🙄',
        '😯', '😦', '😧', '😮',
        '😲', '🥱', '😴', '🤤',
        '😪', '😵', '😵‍💫', '🫥',
        '🤐', '🥴', '🤢', '🤮',
        '🤧', '😷', '🤒', '🤕',
        '🤑', '🤠', '😈', '👿',
        '👹', '👺', '🤡', '💩',
        '👻', '💀', '☠️', '👽',
        '👾', '🤖', '🎃', '😺',
        '😸', '😹', '😻', '😼',
        '😽', '🙀', '😿', '😾',
    ];

    function changeFile(event){
        const file = event.target.files[0];
        if(file !== null && file !== undefined){
            const name = file["name"];
            const type = file["type"];
            const reader = new FileReader();
            reader.onload = (e) =>{
                const fileContent = e.target.result;
                setMessage((prev) => ({
                    ...prev,
                    file: {
                        content: fileContent.replace(/^data:.+;base64,/, ''),
                        name: name,
                        type: type
                    }
                }));
                setPreview(URL.createObjectURL(file));
            };
            
            reader.readAsDataURL(file);
        }
    }

    function removeFile(event){
        event.preventDefault();
        setMessage((prev) => ({
            ...prev,
            file: null
        }));
        setPreview(null);
    }

    return (
        <Transition
              className={`origin-bottom z-10 absolute bottom-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1`}
              show={showOptions}
              enterStart="opacity-0 -translate-x-1"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <div
                  ref={dropdownRef}
                >
                <div className="grid-flow-row">
                  <div className="relative mb-5 pl-3 pr-3">
                    <div className="absolute bottom-0 w-full h-px bg-slate-200" aria-hidden="true"></div>
                    <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                      <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                        <button onClick={() => setActiveTab('emojis')} className={`block pb-3 color-primary whitespace-nowrap ${activeTab === 'emojis' && 'border-b-2 border-indigo-500'}`}>Emojis</button>
                      </li>
                      <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                        <button onClick={() => setActiveTab('images')} className={`block pb-3 color-primary whitespace-nowrap ${activeTab === 'images' && 'border-b-2 border-indigo-500'}`}>Imagens</button>
                      </li>
                    </ul>
                  </div>
                    { activeTab === 'emojis' && (
                        <div style={{overflow: "auto"}} className="text-center grid grid-flow-row-dense grid-cols-8 grid-rows-12 gap-2 h-80">
                            {
                                emojis && emojis.map((emoji, index) => {
                                    return (<button type='button' onClick={() => { setMessage((prev) => ({
                                        ...prev,
                                        message: prev.message.concat(emoji)
                                      })), setShowOptions((prev) => !prev) }} key={index} className='hover:bg-slate-200 p-1'>{emoji}</button>);
                                })
                            }
                        </div>)
                    }
                    { activeTab === 'images' && (
                       <div className={`h-80 p-4 flex align-middle`}>
                            <label className="flex-1 relative block cursor-pointer">
                            <input onChange={changeFile} type="file" name="file" className="peer sr-only"/>
                            <div className="h-60 text-center bg-white px-4 py-6 rounded border border-slate-200 hover:border-indigo-300 dark:bg-slate-800 shadow-sm duration-150 ease-in-out">
                                {
                                    !preview ? (
                                        <svg className="inline-flex w-12 h-12 shrink-0 fill-current mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z" fill="currentColor"></path>
                                        </svg>
                                    ) : (
                                        <div className="h-32">
                                            <ul>
                                                <embed className="w-full h-32" src={preview} type={message?.file?.type} />
                                                <label onClick={removeFile} htmlFor="image" style={{ bottom: "135px", left: "90%", position: "relative", cursor: "pointer" }} className="flex justify-center items-center w-7 h-7 rounded-full bg-red-50 border text-red-400 hover:text-red-600 border-red-400 hover:border-red-600 color-primary shadow-sm transition duration-150 ml-2">
                                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 3l18 18m0-18L3 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </label>
                                            </ul>
                                        </div>
                                    )
                                }
                                <div className="font-medium text-indigo-500 mb-1">Arquivo</div>
                                <div className="text-sm">Selecione um arquivo para ser compartilhado!</div>
                            </div>
                            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                            </label>
                       </div>)
                    }
                </div>
              </div>
            </Transition>
    )
}

export default Options;