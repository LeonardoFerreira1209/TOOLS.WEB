import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import UsersTilesCard from '../../partials/community/UsersTilesCard';
import PaginationNumeric from '../../components/PaginationNumeric';
import ModalBasic from '../../components/ModalBasic';
import { HubConnectionBuilder } from "@microsoft/signalr";

function UsersTiles() {

  const [items, setItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [hubCx, setHubCx] = useState(null);

  useEffect(() => {
    fetch("https://toolsuserapi.azurewebsites.net/api/Person/getAll", {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwNzM5ODM5LWVhN2UtNGU2OC1mOWQ3LTA4ZGE2ZDliZjRkYiIsInVuaXF1ZV9uYW1lIjoiTGVvLkFsbWVpZGEiLCJqdGkiOiIwMjQ1MGE1MC01MjJkLTRmNDMtOWVhYi01YTkyYWU1MGM3ZGQiLCJpYXQiOiIzMS8wNy8yMDIyIDEyOjE2OjQ1IiwidHlwIjoiQmVhcmVyIiwiZW1haWwiOiJMZW8uRmVycmVpcmEzMEBvdXRsb29rLmNvbSIsInBob25lTnVtYmVyIjoiKzU1KDE4KTk5Nzc2LTI0NTIiLCJ3ZWJzaXRlIjoiaHR0cHM6Ly90b29sc3VzZXJhcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiR2V0IjoiQ2VwIiwiQ2VwIjoiR2V0IiwicGVybWlzc2lvbiI6ImFkbWluIiwiZXhwIjoxNjY0NDUzODA1LCJpc3MiOiJIWVBFUi5TRUNVUklUWS5JU1NVRVIuQkVBUkVSIiwiYXVkIjoiSFlQRVIuU0VDVVJJVFkuQVVESUVOQ0UuQkVBUkVSIn0.x_02JGyQAr1pJOxIUmFXp2gSjx4jJBTQzG8EFPEylBE'
      },
      crossDomain:true,
      mode:'cors', 
      method: 'GET',
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(response => response.json()).then((results) => {
          setItems(
            results.dados.map(result => (
              {
                id: result.id,
                name: `${result.firstName} ${result.lastName}` ,
                image: result.image != null ? "data:" + result.image.contentType + ";base64," + result.image.fileContents : "",
                link: "",
                office: result.professions.length > 0 ? result.professions[0].office: "",
                content: result.professions.length > 0 ? result.professions[0].description : "",
              })
            )
          );
        },
        // Nota: é importante lidar com errros aqui
        // em vez de um bloco catch() para não receber
        // exceções de erros reais nos componentes.
        (error) => {
         
        }
      )

  }, [items])

  //#region SignalR
  useEffect(() => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7125/person")
        .withAutomaticReconnect()
        .build()

        setHubCx(newConnection); 

    }, [items]);

  // Receive the messages. 
  useEffect(() => {
    // Hub connected...
    if(hubCx)
    {   
        hubCx.start().then(result => {
          hubCx.on("ReceiveMessage", (person) =>  { 
            
            items.push({

              id: person.id,
              name: `${person.firstName} ${person.lastName}` ,
              image: person.image != null ? "data:" + person.image.contentType + ";base64," + person.image.fileContents : "",
              link: "",
              office: person.professions.length > 0 ? person.professions[0].office: "Sem profissão.",
              content: person.professions.length > 0 ? person.professions[0].description : "Sem descrição.",

          })});

        }).catch(e => console.log('Connection failed: ', e));
    }

  }, [hubCx, items]);
  //#endregion

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */} 
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Usuários. ✨</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                <SearchForm />
                {/* Add member button */}
                <button className="btn bg-gradient-primary-500 hover:bg-indigo-600 text-white" onClick={(e) => { e.stopPropagation(); setBasicModalOpen(true); }}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Adicionar usuário</span>
                </button>
                {/* Basic Modal */}
                <div className="m-1.5">
                      {/* Start */}
                      <ModalBasic id="basic-modal" modalOpen={basicModalOpen} setModalOpen={setBasicModalOpen} title="Basic Modal">
                        {/* Modal content */}
                        <div className="px-5 pt-4 pb-1">
                          <div className="text-sm">
                            <div className="font-medium text-slate-800 mb-2">Let’s Talk Paragraph</div>
                            <div className="space-y-2">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="px-5 py-4">
                          <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setBasicModalOpen(false); }}>Close</button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">I Understand</button>
                          </div>
                        </div>
                      </ModalBasic>
                      {/* End */}
                      </div>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {
                items.map(item => {
                  debugger
                  return (
                    <UsersTilesCard
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      link={item.link}
                      office={item.office}
                      content={item.content}
                    />
                  )
                })
              }
            </div>

            {/* Pagination */}
            <div className="mt-8">
              {items.length > 0 ? <PaginationNumeric /> : null}
            </div>

          </div>
        </main>

      </div>
      
    </div>
  );
}

export default UsersTiles;