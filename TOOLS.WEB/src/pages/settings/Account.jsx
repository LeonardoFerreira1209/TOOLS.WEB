import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SettingsSidebar from '../../partials/settings/SettingsSidebar';
import AccountPanel from '../../partials/settings/AccountPanel';
import { useParams } from 'react-router-dom';

function Account() {

  const [person, setPersons] = useState(null);

   let {id} = useParams();

  useEffect(() => {
    debugger
    fetch(`https://toolsuserapi.azurewebsites.net/api/Person/get/${id}`, {
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
      .then(response => response.json()).then((personResult) => {
            setPersons({
              firstName: personResult.dados.firstName != null ? personResult.dados.firstName : "",
              secondName: personResult.dados.lastName != null ? personResult.dados.lastName : "",
              age: personResult.dados.age != null ?? person.dados.age,
              image: personResult.dados.image != null ? "data:" + personResult.dados.image.contentType + ";base64," + personResult.dados.image.fileContents : "",
            });
            debugger
        },
        // Nota: é importante lidar com errros aqui
        // em vez de um bloco catch() para não receber
        // exceções de erros reais nos componentes.
        (error) => {}
      )

  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if(person != null)
  {
    return (
      <div className="flex h-screen overflow-hidden">
  
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
        {/* Content area */} 
        <div className="relative flex flex-col flex-1 no-scrollbar overflow-x-hidden">
  
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
  
              {/* Page header */}
              <div className="mb-8">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Editar perfil ✨</h1>
              </div>
  
              {/* Content */} 
              <div className="bg-white shadow-lg rounded-sm mb-8">
                <div className="flex flex-col md:flex-row md:-mr-px">
                  <SettingsSidebar person={person} />
                  <AccountPanel person={person} />
                </div>
              </div>
  
            </div>
          </main>
  
        </div>
        
      </div>
    );
  }
}

export default Account;