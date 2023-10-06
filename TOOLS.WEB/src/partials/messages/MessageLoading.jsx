function MessageLoading({
  userImage
}) {

  return (
    <div className="flex items-start mb-4 last:mb-0">
      <img className="rounded-full mr-4" src={userImage} width="40" height="40" alt="User 01" />
      <div>
        <div className="text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
          <svg className="fill-current text-slate-400" viewBox="0 0 15 3" width="15" height="3">
            <circle cx="1.5" cy="1.5" r="1.5">
              <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
            </circle>
            <circle cx="7.5" cy="1.5" r="1.5">
              <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
            </circle>
            <circle cx="13.5" cy="1.5" r="1.5">
              <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MessageLoading;