import React, { useMemo } from 'react';
import queryString from 'query-string'; // convierte la query en un objeto no en string como devuelve location.search
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';
import { HeroeCard } from '../herores/HeroeCard';
import { getHeroesyName } from '../../selectors/getHeroesyName';

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search); // parse retorna undefined cuando no hay queryString

  const [formValues, handleInputChange] = useForm({ searchText: q });

  const { searchText } = formValues;

  // const heroesFiltered = getHeroesyName(searchText);

  const heroesFiltered = useMemo(() => getHeroesyName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input name="searchText" type="text" placeholder="Find your hero" className="form-control" autoComplete="off" onChange={handleInputChange} value={searchText} />
            <button type="submit" className="btn m-1 btn-block btn-outline-primary">
              Search ...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === '' && <div className="alert alert-info">Search a hero</div>}
          {q !== '' && heroesFiltered.length === 0 && <div className="alert alert-danger">There is no a hero with {q}</div>}
          {heroesFiltered.map((hero) => (
            <HeroeCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
