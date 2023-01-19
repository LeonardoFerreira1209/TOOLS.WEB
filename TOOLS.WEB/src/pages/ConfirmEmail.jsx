import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Image from '../images/—Pngtree—2 5d business office data_4115598.jpg';

function ConfirmEmail() {

  // -- CONSTS
  let {code, userId} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // -- CONSTS

  // -- API CONSUMER
  function ConfirmEmail(event) {
    
    setLoading(true);

    event.preventDefault();

    fetch(`${process.env.BASE_URL}api/User/activate/${code}/${userId}`, 
    {
      crossDomain:true,
      mode:'cors', 
      method: 'GET',
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then(response => response.json()).then((results) => {
      
        if(results.sucesso){
          navigate("/signin");
        }
        else{
          setError(results.notificacoes[0].mensagem); setLoading(false);
        }
      },
      (error) => {
        setError("Ops, não conseguimos fazer a requisição!"); setLoading(false);
      }
    )
  }
  // -- API CONSUMER

  // -- RETURNS
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Items */}
          <div className="grid gap-20" data-aos-id-features-home>

            {/* Item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up" data-aos-anchor="[data-aos-id-features-home]">
                <div className="relative">
                  <img className="md:max-w-none" src={Image} width="100%" height="100%" alt="Features illustration" />
                </div>
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right" data-aos-anchor="[data-aos-id-features-home]">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl  mb-2">Sejá bem vindo <strong>ao seu novo software ERP</strong></div>
                  <h3 className="h3 mb-3 color-primary-400">Diga olá ao <strong>TOOLS.API</strong></h3>
                  <p className="text-xl mb-4">O <strong>TOOLS.API</strong> oferece divensar funcionalidades com o intuito de facilitar seu gerencimento de negócios e muito</p>
                  <ul className="flex flex-wrap text-lg -mx-2 -my-1">
                    <li className="flex items-center mx-2 my-1">
                      <svg className="w-3 h-3 fill-current color-primary-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span><strong>Dashboards</strong></span>
                    </li>
                    <li className="flex items-center mx-2 my-1">
                      <svg className="w-3 h-3 fill-current color-primary-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span><strong>Gerencimento de usuários</strong></span>
                    </li>
                    <li className="flex items-center mx-2 my-1">
                      <svg className="w-3 h-3 fill-current color-primary-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span><strong>Controle financeiro</strong></span>
                    </li>
                    <li className="flex items-center mx-2 my-1">
                      <svg className="w-3 h-3 fill-current color-primary-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span><strong>Design elegante</strong></span>
                    </li>
                    <li className="flex items-center mx-2 my-1">
                      <svg className="w-3 h-3 fill-current color-primary-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span><strong>Sempre atualizado, com novas funcionalidades</strong></span>
                    </li>
                  </ul>
                  <div className="flex items-start mt-8">
                    <div>
                      <span>Agora que já está por dentro de tudo que temos a oferecer, que tal concluir o seu login clicando no botão abaixo para confirmar-mos o seu login!</span>
                    </div>
                  </div>
                  <button data-aos="fade-up" onClick={ConfirmEmail} className="w-full mt-3 btn bg-gradient-primary-500 text-white">
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

          </div>

        </div>
      </div>
    </section>
  );
  // -- RETURNS
}

export default ConfirmEmail;