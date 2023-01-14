import React from 'react';
import Flatpickr from 'react-flatpickr';

function DatepickerCalendar({
  eventValues,
  setEventValues,
  id,
  name,
  align,
}) {

  const customLocale = {
    weekdays: {
      shorthand: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      longhand: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    },
    months: {
      shorthand: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
      longhand: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    },
    daysInMonth: [
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    firstDayOfWeek: 7,
    time_24hr: true
  }

  const options = {
    minDate: new Date(),
    mode: 'single',
    enableTime: true,
    time_24hr: true,
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'j-m-Y H:i',
    defaultDate: new Date(),
    prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      //instance.element.value = dateStr.replace('to', '-');
      const customClass = (align) ? align : '';

      instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
    },
    onChange: (selectedDates, dateStr, instance) => {
      const name = instance.element.name;

      setEventValues(
      {...eventValues, 
        [name]: selectedDates.find(date => date)
      });
      //instance.element.value = dateStr.replace('to', '-');
    },
    locale: customLocale
  }

  return (
    <div className="relative">
      <Flatpickr id={id} name={name} className="form-input pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-60" options={options} />
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg className="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  );
}

export default DatepickerCalendar;
