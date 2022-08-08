import React, { useState } from 'react';

import NotFoundImage from '../images/—Pngtree—global data security personal data_7255062.png';

function ConfirmEmail() {

  const [loading, setLoading] = useState(false);

  function teste(event)
  {
    setLoading(true);

    event.preventDefault();
  }

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 no-scrollbar overflow-x-hidden bg-white">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <div className="max-w-2xl m-auto mt-16">

              <div className="text-center px-4">
                <div className="inline-flex mb-8">
                  <img data-aos="fade-down" ata-aos-delay="100" className='shadow-transparent-image' src={NotFoundImage} width="600" height="300" alt="404 illustration" />
                </div>
                <h1 data-aos="fade-up" ata-aos-delay="200"  className="mb-6">Usuário criado com sucesso! Clique no botão abaixo para confirma-lo!</h1>
                <button data-aos="fade-up" ata-aos-delay="400" onClick={teste} className="btn bg-gradient-primary-500 text-white">
                {
                  loading === false ? ("Confirmar usuário") : (
                    <lord-icon
                      src="https://cdn.lordicon.com/yiniatmi.json"
                      trigger="loop"
                      colors="primary:#ffffff"
                      style={{width:120,height:20}}>
                    </lord-icon>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConfirmEmail;