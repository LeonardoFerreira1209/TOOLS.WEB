import React from 'react';

function SearchForm({
  placeholder
}) {
  return (
    <form className="relative">
      <label htmlFor="action-search" className="sr-only">Buscar usuários</label>
      <input id="action-search" className="form-input pl-9 focus:border-slate-300" type="search" placeholder={placeholder} />
      <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
      <lord-icon
          src="https://cdn.lordicon.com/osbjlbsb.json"
          trigger="morph"
          >
      </lord-icon>
      </button>
    </form>
  );
}

SearchForm.defaultProps = {
  placeholder: 'Buscar usuários'
}

export default SearchForm;