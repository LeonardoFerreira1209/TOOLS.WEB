import React, { useState, useEffect, useContext } from 'react';

import moment from 'moment';
import ModalBasic from '../components/ModalBasic';
import DatepickerCalendar from '../components/DatepickerCalendar';
import StoreContext from "../components/store/context/ContextUser";
import { BlockPicker  } from 'react-color';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Calendar() {

  const today = new Date();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(today.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startingBlankDays, setStartingBlankDays] = useState([]);
  const [endingBlankDays, setEndingBlankDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [color, setColor] = useState();
  const [eventTypeModalOpen, setEventTypeModalOpen] = useState(false);
  const [eventValues, setEventValues] = useState(initializeEventValues);
  const [eventTypeValues, setEventTypeValues] = useState(initializeEventTypeValues);
  const { user } = useContext(StoreContext);

  // initialize event state.
  function initializeEventValues(){
    return {
      email: '',
      firstName: '',
      lastName: '',
      description: '',
      startEvent: new Date(),
      endEvent: new Date()
    };
  };

  // initialize event type state.
  function initializeEventTypeValues(){
    return {
      eventTypeName: '',
      eventTypeColor: '#22194d'
    };
  };

  // get events and eventTypes in api on load page.
  useEffect(() => {
    
    // fetch events in web api.
    fetch(`${process.env.BASE_URL}gateway/event/getall`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.tokenJwt}`
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
          if(results.sucesso){    
            setEvents(
              results.dados.map(data => ({
                id: data.id,
                eventType: data.eventType,
                eventStart: data.startEvent,
                eventName: data.description,
                eventEnd: data.endEvent
              }))
            );
          }
          else{
            console.error(results.notificacoes[0].mensagem);

            toast.info(results.notificacoes[0].mensagem, {
              theme: 'light',
              autoClose: true
            });
          }
      },
      (error) => {
        console.error(error.message);
      
        toast.error("Ops, Falha ao recuperar evento!", {
          theme: 'light',
          autoClose: true
        });

      }).catch(error => {
        console.error(error.message);
      
        toast.error("Ops, Falha ao recuperar evento!", {
          theme: 'light',
          autoClose: true
        });
        
      });

      // fetch event types in web api.
      fetch(`${process.env.BASE_URL}gateway/event/getall/eventtypes`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokenJwt}`
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
          if(results.sucesso){    
            setEventTypes(
              results.dados.map(data => ({
                id: data.id,
                name: data.name,
                color: data.color,
              }))
            );
          }
          else{
            console.error(results.notificacoes[0].mensagem);

            toast.info(results.notificacoes[0].mensagem, {
              theme: 'light',
              autoClose: true
            });
          }
      },
      (error) => {
        console.error(error.message);
      
        toast.error("Ops, Falha ao recuperar tipos de evento!", {
          theme: 'light',
          autoClose: true
        });

      }).catch(error => {
        console.error(error.message);
      
        toast.error("Ops, Falha ao recuperar tipos de evento!", {
          theme: 'light',
          autoClose: true
        });
      });

  }, []);

  // verify day.
  const isToday = (date) => {
    const day = new Date(year, month, date);
    return today.toDateString() === day.toDateString() ? true : false;
  };

  // filter events.
  const getEvents = (date) => {
    return events.filter(e => new Date(e.eventStart).toDateString() === new Date(year, month, date).toDateString());
  };

  // get days.
  const getDays = () => {
    const days = new Date(year, month + 1, 0).getDate();
    
    // starting empty cells (previous month)
    const startingDayOfWeek = new Date(year, month).getDay();

    let startingBlankDaysArray = [];

    for (let i = 1; i <= startingDayOfWeek; i++) { startingBlankDaysArray.push(i); }

    // ending empty cells (next month)
    const endingDayOfWeek = new Date(year, month + 1, 0).getDay();

    let endingBlankDaysArray = [];

    for (let i = 1; i < 7 - endingDayOfWeek; i++) { endingBlankDaysArray.push(i); }

    // current month cells
    let daysArray = [];

    for (let i = 1; i <= days; i++) { daysArray.push(i); }

    setStartingBlankDays(startingBlankDaysArray);

    setEndingBlankDays(endingBlankDaysArray);

    setDaysInMonth(daysArray);
  };

  // get days on load page
  useEffect(() => {
    getDays();
  }, [month]);

  // handle on change events.
  function onChangeEvents(event) {
    const {value, name} = event.target;

    setEventValues(
    {...eventValues, 
      [name]: value
    });
  }

  // handle on create event type.
  function CreateEventType(event){
    event.preventDefault();

    fetch(`${process.env.BASE_URL}gateway/event/create/eventype`, {
        crossDomain:true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokenJwt}`
        },
        mode:'cors', 
        method: 'POST',
        body: JSON.stringify({
          Name: eventTypeValues.eventTypeName,
          Color: eventTypeValues.eventTypeColor,
        })
      })
      .then(response => response.json()).then((results) => {
          if(results.sucesso){    
            setEventTypes([...eventTypes, {
              id: results.dados.id,
              name: results.dados.name,
              color: results.dados.color,
            }]);
          }
          else{
            setError(results.notificacoes[0].mensagem);
          }
        },
        (error) => {
          console.error(error);

          setError("Ops, não conseguimos fazer a requisição!");
        }

      ).catch(error => {
        console.error(error);

        setError("Ops, tivemos um erro inesperado!");
      });
  };

  // handle on create event.
  function CreateEvent(event){
    event.preventDefault();

    fetch(`${process.env.BASE_URL}gateway/event/create`, {
        crossDomain:true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokenJwt}`
        },
        mode:'cors', 
        method: 'POST',
        body: JSON.stringify({
          FirstName: eventValues.firstName,
          LastName: eventValues.lastName,
          EventTypeId: eventValues.type ?? eventTypes.find(event => event)?.id,
          Email: eventValues.email,
          StartEvent: eventValues.startEvent,
          EndEvent: eventValues.endEvent,
          Description: eventValues.description
        })
      })
      .then(response => response.json()).then((results) => {
          if(results.sucesso){
            toast.success("Evento criado com sucesso!", {
              theme: 'light',
              autoClose: true
            });
  
            setEvents([...events, {
              id: results.dados.id,
              eventType: results.dados.eventType,
              eventStart: results.dados.startEvent,
              eventName: results.dados.description,
              eventEnd: results.dados.endEvent
            }]);
          }
          else{
            console.error(results.notificacoes[0].mensagem);

            toast.info(results.notificacoes[0].mensagem, {
              theme: 'light',
              autoClose: true
            });
          }
        },
        (error) => {
          console.error(error.message);
      
          toast.error("Ops, Falha ao criar evento!", {
            theme: 'light',
            autoClose: true
          });
        }

      ).catch(error => {
        console.error(error.message);

        toast.error("Ops, Falha ao criar evento!", {
          theme: 'light',
          autoClose: true
        });
      });
  };

  return (
    <>
        {/* IziToast */}
        <ToastContainer className="toast-position"></ToastContainer>
        {/* Start */}
        <ModalBasic id="event-modal" modalOpen={eventModalOpen} setModalOpen={setEventModalOpen} title="Crie seu evento">
          {/* Modal content */}
          <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 mb-3">Informe os dados do seu evento</div>
              </div>
              {/* Form */}
            <form>
              <div className='grid gap-5 md:grid-cols-2 mt-2'>
                <div>
                  {/* Datepicker built with flatpickr */}
                  <DatepickerCalendar eventValues={eventValues} setEventValues={setEventValues} id="startEvent" name="startEvent" align="right"/>
                </div>
                <div>
                  {/* Datepicker built with flatpickr */}
                  <DatepickerCalendar eventValues={eventValues} setEventValues={setEventValues} id="endEvent" name="endEvent" align="left"/>
                </div>
              </div>
              <div className='grid gap-2 md:grid-cols-1 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email<span className="text-rose-500">*</span></label>
                  <input onChange={onChangeEvents} id="email" name='email' className="form-input w-full px-2 py-1" type="email" required />
                </div>
              </div>
              <div className='grid gap-2 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                  <input onChange={onChangeEvents} id="firstName" name='firstName' className="form-input w-full px-2 py-1" type="text" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
                  <input onChange={onChangeEvents} id="lastName" name='lastName' className="form-input w-full px-2 py-1" type="text" required />
                </div>
              </div>
            <div className='grid gap-1 md:grid-cols-1 mt-2'>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="role">Tipo de evento<span className="text-rose-500">*</span></label>
                <select onChange={onChangeEvents} id="type" type="text" name='type' className="form-input w-full px-2 py-1">
                  {
                    eventTypes?.map(eventType => {
                      return (
                        <option key={eventType.id} value={eventType.id}>{eventType.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className='grid gap-1 md:grid-cols-1 mt-2'>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="feedback">Descrição<span className="text-rose-500">*</span></label>
                <textarea onChange={onChangeEvents} name='description' id="description" className="form-textarea w-full px-2 py-1" rows="4" required></textarea>
              </div>
            </div>
           </form>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button type='button' className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setEventModalOpen(false); }}>Cancelar</button>
              <button onClick={CreateEvent} type='button' className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Criar</button>
            </div>
          </div>
        </ModalBasic>
        {/* End */}

         {/* Start */}
         <ModalBasic id="event-type-modal" modalOpen={eventTypeModalOpen} setModalOpen={setEventTypeModalOpen} title="Crie seu tipo de evento">
          {/* Modal content */}
          <div className="px-5 py-4">
            <div className="text-sm">
              <div className="font-medium text-slate-800 mb-3">Informe os dados do tipo de evento</div>
            </div>
            {/* Form */}
            <form>
              <div className='grid gap-2 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="eventTypeName">Nome do tipo<span className="text-rose-500">*</span></label>
                  <input onChange={(event) => setEventTypeValues({...eventTypeValues, [event.target.name]: event.target.value})} id="eventTypeName" name='eventTypeName' className="form-input w-full px-2 py-1" type="text" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="eventTypeColor">Cor do tipo<span className="text-rose-500">*</span></label>
                  <BlockPicker triangle='hide' width='100%' color={color} colors={["#0f172a", "#b91c1c", "#ea580c", "#fbbf24", "#a3e635", "#4ade80", "#34d399", "#2dd4bf", "#22d3ee", "#38bdf8", "#60a5fa", "#818cf8"]} onChangeComplete={(color) => {setColor(color.hex), setEventTypeValues({...eventTypeValues, ['eventTypeColor']: color.hex})}} id="eventTypeColor" name='eventTypeColor' className="form-input w-full px-2 py-1" required />
                </div>
              </div>
            </form>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button type='button' className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setEventTypeModalOpen(false); }}>Cancelar</button>
              <button onClick={CreateEventType} type='button' className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Criar</button>
            </div>
          </div>
        </ModalBasic>
        {/* End */}     
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-4">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold"><span>{`${monthNames[month]} ${year}`}</span> ✨</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                {/* Previous month button */}
                <button
                  type='button' className="btn px-2.5 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  disabled={month === 0 ? true : false} onClick={() => setMonth(month - 1)}
                >
                  <span className="sr-only">Mês anterior</span><wbr />
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                    <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                  </svg>
                </button>

                {/* Next month button */}
                <button
                  type='button' className="btn px-2.5 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  disabled={month === 11 ? true : false} onClick={() => setMonth(month + 1)}
                >
                  <span className="sr-only">Próximo mês</span><wbr />
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                    <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                  </svg>
                </button>

                <hr className="w-px h-full bg-slate-200 mx-1" />

                {/* Create event button */}
                <button type='button' onClick={(e) => { e.stopPropagation(); setEventModalOpen(true); }} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Criar evento</span>
                </button>
              </div>
            </div>

            {/* Filters and view buttons */}
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
              {/* Filters  */}
              <div className="mb-4 sm:mb-0 mr-2">
                <ul className="flex flex-wrap items-center -m-1">
                  {
                    eventTypes?.map(eventType => {
                      return (
                        <li key={eventType.id} className="m-1">
                          <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                            <div style={{backgroundColor: eventType.color}} className='w-1 h-3.5 shrink-0'></div>
                            <span className="ml-1.5">{eventType.name}</span>
                          </button>
                        </li>)
                    })
                  }
                  <li className="m-1">
                    <button type='button' onClick={(e) => { e.stopPropagation(); setEventTypeModalOpen(true); }} className="btn-sm bg-white border-slate-200 hover:border-slate-300 color-primary">+Adicionar mais</button>
                  </li>
                </ul>
              </div>

              {/* View buttons (requires custom integration) */}
              <div className="flex flex-nowrap -space-x-px">
                <button className="btn bg-slate-50 border-slate-200 hover:bg-slate-50 color-primary rounded-none first:rounded-l last:rounded-r">Mês</button>
                <button disabled className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none text-slate-600 rounded-none first:rounded-l last:rounded-r">Semana</button>
                <button disabled className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none text-slate-600 rounded-none first:rounded-l last:rounded-r">Dia</button>
              </div>
            </div>

            {/* Calendar table */}
            <div className="bg-white rounded-sm shadow overflow-hidden">

              {/* Days of the week */}
              <div className="grid grid-cols-7 gap-px border-b border-slate-200">
                {
                  dayNames.map(day => {      
                    return (          
                      <div className="px-1 py-3" key={day}>
                        <div className="text-slate-500 text-sm font-medium text-center lg:hidden">{day.substring(0,3)}</div>
                        <div className="text-slate-500 text-sm font-medium text-center hidden lg:block">{day}</div>
                      </div>
                    )
                  })
                }                
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px bg-slate-200">
                {/* Diagonal stripes pattern */}
                <svg className="sr-only">
                  <defs>
                    <pattern id="stripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(135)">
                      <line className="stroke-current text-slate-200 opacity-50" x1="0" y="0" x2="0" y2="5" strokeWidth="2" />
                    </pattern>
                  </defs>
                </svg>
                {/* Empty cells (previous month) */}
                {
                  startingBlankDays.map(blankday => {
                    return (          
                      <div className="bg-slate-50 h-20 sm:h-28 lg:h-36" key={blankday}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                          <rect width="100%" height="100%" fill="url(#stripes)" />
                        </svg>
                      </div>
                    )
                  })
                }                  
                {/* Days of the current month */}
                {
                  daysInMonth.map(day => {
                    return (
                      new Date(year, month, day) >= moment().subtract(1, 'days').toDate() ? (
                        (
                          <div className="relative bg-white h-20 sm:h-28 lg:h-36 overflow-hidden" key={day}>
                          <div className="h-full flex flex-col justify-between">
                            {/* Events */}
                            <div className="grow flex flex-col relative p-0.5 sm:p-1.5 overflow-hidden">
                              {
                                getEvents(day).map(event => {
                                  return (
                                    <button className="relative w-full text-left mb-1" key={event.id}>
                                      <div style={{backgroundColor: event.eventType.color}} className={`px-2 py-0.5 text-white rounded overflow-hidden`}>
                                        {/* Event name */}
                                        <div className="text-xs font-semibold truncate">{event.eventName}</div>
                                        {/* Event time */}
                                        <div className="text-xs uppercase truncate hidden sm:block">
                                          {/* Start date */}
                                          { event.eventStart &&       
                                            <span>{new Date(event.eventStart).toLocaleTimeString([], {hourCycle: 'h24', hour: 'numeric', minute:'numeric'})}</span>
                                          }
                                          &ensp;-&ensp;
                                          {/* End date */}
                                          { event.eventEnd &&
                                            <span>{new Date(event.eventEnd).toLocaleTimeString([], {hourCycle: 'h24', hour: 'numeric', minute:'numeric'})}</span>
                                          }
                                        </div>
                                      </div>
                                    </button>                                  
                                  )
                                })
                              }                                  
                              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden="true"></div>
                            </div>
                            {/* Cell footer */}
                            <div className="flex justify-between items-center p-0.5 sm:p-1.5">
                              {/* More button (if more than 2 events) */}
                              {getEvents(day).length > 2 &&
                                <button className="text-xs text-slate-500 font-medium whitespace-nowrap text-center sm:py-0.5 px-0.5 sm:px-2 border border-slate-200 rounded">
                                  <span className="md:hidden">+</span><span>{getEvents(day).length - 2}</span><span className="hidden md:inline">mais</span>
                                </button>
                              }
                              {/* Day number */}
                              <button className={`inline-flex ml-auto w-6 h-6 items-center justify-center text-xs sm:text-sm font-medium text-center rounded-full hover:bg-indigo-100 ${isToday(day) && 'color-primary'}`}>{day}</button>
                            </div>
                          </div>
                        </div>                      
                        )
                      ) : (
                        <div className="bg-slate-50 h-20 sm:h-28 lg:h-36" key={day}>
                          {/* Day number */}
                          <button style={{ zIndex: 1, position: "relative" }} className={`inline-flex ml-auto w-6 h-6 items-center justify-center text-xs sm:text-sm font-medium text-center rounded-full hover:bg-indigo-100 ${isToday(day) && 'color-primary'}`}>{day}</button>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <rect width="100%" height="100%" fill="url(#stripes)" />
                          </svg>
                        </div>
                      )
                    )
                  })
                }                                         
                {/* Empty cells (next month) */}
                {
                  endingBlankDays.map(blankday => {
                    return (
                      <div className="bg-slate-50 h-20 sm:h-28 lg:h-36" key={blankday}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                          <rect width="100%" height="100%" fill="url(#stripes)" />
                        </svg>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </main>
    </>
  );
}

export default Calendar;