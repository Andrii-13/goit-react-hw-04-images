import { useState } from 'react';
import toast from 'react-hot-toast';

import css from './Searchbar.module.css';

export const Searchbar = ({onSubmitSearchbar}) => {
  const [name, setName] = useState('');

  const handlChange = input => {
    setName(input.value);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      setName('');
      toast('You enter empty query', {
        icon: '🟨',
      });
    }
    onSubmitSearchbar(name);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handlerSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}></span>
        </button>

        <input
          name="name"
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          onChange={e => handlChange(e.target)}
        />
      </form>
    </header>
  );
};
