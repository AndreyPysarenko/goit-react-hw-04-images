import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <ImSearch size="20" />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
};

export default SearchBar;
