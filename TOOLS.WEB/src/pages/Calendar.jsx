import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ModalBasic from '../components/ModalBasic';
import Datepicker from '../components/Datepicker';

function Calendar() {

  const today = new Date();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(today.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([])
  const [startingBlankDays, setStartingBlankDays] = useState([])
  const [endingBlankDays, setEndingBlankDays] = useState([])
  const [events, setEvents] = useState([])
  const [eventModalOpen, setEventModalOpen] = useState(false)

  useEffect(() => {
    fetch(`https://localhost:7271/api/Calendar/get/events`, {
        crossDomain:true,
        mode:'cors', 
        method: 'GET',
        cache: 'no-cache',
        credentials:'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
      .then(response => response.json()).then((results) => {
        debugger
        setEvents(results);
      },
      (error) => {
        console.error(error);

        setError("Ops, não conseguimos fazer a requisição!"); setLoading(false);
      }).catch(error => {
        console.error(error);

        setError("Ops, tivemos um erro inesperado!"); setLoading(false);
      });
  }, [])
  // const events = [
  //   // Previous month
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 8, 3),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 8, 7),
  //     eventName: '⛱️ Relax for 2 at Marienbad',
  //     eventColor: 'indigo'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 12, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 11),
  //     eventName: 'Team Catch-up',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 18, 2),
  //     eventEnd: '',
  //     eventName: '✍️ New Project (2)',
  //     eventColor: 'yellow'
  //   },
  //   // Current month
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 11),
  //     eventName: 'Meeting w/ Patrick Lin',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 19),
  //     eventEnd: '',
  //     eventName: 'Reservation at La Ginestre',
  //     eventColor: 'indigo'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 9),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 10),
  //     eventName: '✍️ New Project',
  //     eventColor: 'yellow'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 21),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 22),
  //     eventName: '⚽ 2021 - Semi-final',
  //     eventColor: 'red'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 4, 9, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 11),
  //     eventName: 'Meeting w/Carolyn',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 13),
  //     eventEnd: '',
  //     eventName: 'Pick up Marta at school',
  //     eventColor: 'emerald'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 14),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 15),
  //     eventName: 'Meeting w/ Patrick Lin',
  //     eventColor: 'emerald'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 19),
  //     eventEnd: '',
  //     eventName: 'Reservation at La Ginestre',
  //     eventColor: 'indigo'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 11, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 11, 11),
  //     eventName: '⛱️ Relax for 2 at Marienbad',
  //     eventColor: 'indigo'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 11, 19),
  //     eventEnd: '',
  //     eventName: '⚽ 2021 - Semi-final',
  //     eventColor: 'red'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 14, 11),
  //     eventName: 'Team Catch-up',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 2),
  //     eventEnd: '',
  //     eventName: 'Pick up Marta at school',
  //     eventColor: 'emerald'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 3),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 7),
  //     eventName: '✍️ New Project (2)',
  //     eventColor: 'yellow'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 11),
  //     eventName: 'Team Catch-up',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 19),
  //     eventEnd: '',
  //     eventName: '⚽ 2021 - Semi-final',
  //     eventColor: 'red'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 23, 0),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 23, 23),
  //     eventName: 'You stay at Meridiana B&B',
  //     eventColor: 'indigo'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 11),
  //     eventName: 'Meeting w/ Kylie Joh',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 29, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 29, 11),
  //     eventName: 'Call Request ->',
  //     eventColor: 'sky'
  //   },
  //   // Next month
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2, 3),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2, 7),
  //     eventName: '✍️ New Project (2)',
  //     eventColor: 'yellow'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 14, 10),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 14, 11),
  //     eventName: 'Team Catch-up',
  //     eventColor: 'sky'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 25, 2),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 25, 3),
  //     eventName: 'Pick up Marta at school',
  //     eventColor: 'emerald'
  //   },
  //   {
  //     eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 27, 21),
  //     eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 27, 22),
  //     eventName: '⚽ 2021 - Semi-final',
  //     eventColor: 'red'
  //   },
  // ];

  const isToday = (date) => {
    const day = new Date(year, month, date);
    return today.toDateString() === day.toDateString() ? true : false;
  }

  const getEvents = (date) => {
    return events.filter(e => new Date(e.eventStart).toDateString() === new Date(year, month, date).toDateString());
  }

  const eventColor = (color) => {
    switch (color) {
      case 'sky':
        return 'text-white bg-sky-500';
      case 'indigo':
        return 'text-white bg-indigo-500';
      case 'yellow':
        return 'text-white bg-amber-500';
      case 'emerald':
        return 'text-white bg-emerald-500';
      case 'red':
        return 'text-white bg-rose-400';
      default:
        return '';
    }
  };

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
  }

  const [state, setState] = useState();

  useEffect(() => {
    debugger
    state
    getDays();
  }, [month]);

  return (
    <div className="flex h-screen overflow-hidden">
        {/* Start */}
        <ModalBasic id="event-modal" modalOpen={eventModalOpen} setModalOpen={setEventModalOpen} title="Crie seu evento 🗓️">
          {/* Modal content */}
          <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 mb-3">Informe os dados do seu evento</div>
              </div>
              {/* Form */}
            <form>
              <div className='grid gap-2 md:grid-cols-2 mt-2'>
                <div>
                  {/* Datepicker built with flatpickr */}
                  <Datepicker setState={setState} id="teste1" align="right"/>
                  {/* <label className="block text-sm font-medium mb-1" htmlFor="startDate">Data inicial<span className="text-rose-500">*</span></label>
                  <input id="startDate" className="form-input w-full px-2 py-1" type="datetime-local" required /> */}
                </div>
                <div>
                  <Datepicker setState={setState} id="teste2" align="left"/>
                  {/* <label className="block text-sm font-medium mb-1" htmlFor="endDate">Data final<span className="text-rose-500">*</span></label>
                  <input id="endDate" className="form-input w-full px-2 py-1" type="datetime-local" required /> */}
                </div>
              </div>
              <div className='grid gap-2 md:grid-cols-1 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email<span className="text-rose-500">*</span></label>
                  <input id="email" className="form-input w-full px-2 py-1" type="text" required />
                </div>
              </div>
              <div className='grid gap-2 md:grid-cols-2 mt-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">Nome<span className="text-rose-500">*</span></label>
                  <input id="firstName" className="form-input w-full px-2 py-1" type="text" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">Sobrenome<span className="text-rose-500">*</span></label>
                  <input id="lastName" className="form-input w-full px-2 py-1" type="lastName" required />
                </div>
              </div>
            <div className='grid gap-1 md:grid-cols-1 mt-2'>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="feedback">Message <span className="text-rose-500">*</span></label>
                <textarea id="feedback" className="form-textarea w-full px-2 py-1" rows="4" required></textarea>
              </div>
            </div>
           </form>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button type='button' className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setEventModalOpen(false); }}>Cancelar</button>
              <button type='button' className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Criar</button>
            </div>
          </div>
        </ModalBasic>
        {/* End */}

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */} 
      <div className="relative flex flex-col flex-1 no-scrollbar overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                  <li className="m-1">
                    <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                      <div className="w-1 h-3.5 bg-sky-500 shrink-0"></div>
                      <span className="ml-1.5">Acme Inc.</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                      <div className="w-1 h-3.5 bg-emerald-500 shrink-0"></div>
                      <span className="ml-1.5">Life & Family</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                      <div className="w-1 h-3.5 bg-indigo-500 shrink-0"></div>
                      <span className="ml-1.5">Reservations</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                      <div className="w-1 h-3.5 bg-rose-400 shrink-0"></div>
                      <span className="ml-1.5">Events</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                      <div className="w-1 h-3.5 bg-amber-500 shrink-0"></div>
                      <span className="ml-1.5">Misc</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 color-primary">+Adicionar mais</button>
                  </li>
                </ul>
              </div>

              {/* View buttons (requires custom integration) */}
              <div className="flex flex-nowrap -space-x-px">
                <button className="btn bg-slate-50 border-slate-200 hover:bg-slate-50 color-primary rounded-none first:rounded-l last:rounded-r">Mês</button>
                <button className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r">Semana</button>
                <button className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r">Dia</button>
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
                      <div className="relative bg-white h-20 sm:h-28 lg:h-36 overflow-hidden" key={day}>
                        <div className="h-full flex flex-col justify-between">
                          {/* Events */}
                          <div className="grow flex flex-col relative p-0.5 sm:p-1.5 overflow-hidden">
                            {
                              getEvents(day).map(event => {
                                return (
                                  <button className="relative w-full text-left mb-1" key={event.eventName}>
                                    <div className={`px-2 py-0.5 rounded overflow-hidden ${eventColor(event.eventColor)}`}>
                                      {/* Event name */}
                                      <div className="text-xs font-semibold truncate">{event.eventName}</div>
                                      {/* Event time */}
                                      <div className="text-xs uppercase truncate hidden sm:block">
                                        {/* Start date */}
                                        {event.eventStart &&        
                                          <span>{new Date(event.eventStart).toLocaleTimeString([], {hour12: true, hour: 'numeric', minute:'2-digit'})}</span>
                                        }
                                        {/* End date */}
                                        {event.eventEnd &&  
                                          <span>
                                            - <span>{new Date(event.eventEnd).toLocaleTimeString([], {hourCycle: 'h24', hour: 'numeric', minute:'numeric'})}</span>
                                          </span>
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
                                <span className="md:hidden">+</span><span>{getEvents(day).length - 2}</span> <span className="hidden md:inline">mais</span>
                              </button>
                            }
                            {/* Day number */}
                            <button className={`inline-flex ml-auto w-6 h-6 items-center justify-center text-xs sm:text-sm font-medium text-center rounded-full hover:bg-indigo-100 ${isToday(day) && 'color-primary'}`}>{day}</button>
                          </div>
                        </div>
                      </div>                      
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
      </div>
    </div>
  );
}

export default Calendar;