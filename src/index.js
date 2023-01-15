import './css/styles.css';
import './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const inputHandle = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelectorAll('.country-info');
const DEBOUNCE_DELAY = 300;

inputHandle.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  event.preventDefault();
  const input = inputHandle.value.trim();
  if (input === '') {
    return;
  } else {
    fetchCountries(input).then(countries => {
      createCountriesMarkup(countries);
    });
    // .catch(
    //   Notiflix.Notify.failure('Oops, there is no country with that name')
    // );
  }
}

function createCountriesMarkup(countries) {
  // countryInfoRef.remove();
  if (countries.length === 1) {
    countries.map(country => {
      const markup = `<div class="country-info">
      <div>
        <svg width="30" height="20">
          <use href="${country.flags.svg}"></use>
         </svg>
         <p>${country.name.official}</p>
      </div>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${Object.values(country.languages)}</p>
    </div>`;
      countryListRef.insertAdjacentHTML('beforeend', markup);
    });
  } else if (countries.length < 10) {
    countries.map(country => {
      const markup = `<div class="country-info">
      <div>
        <svg width="30" height="20">
          <use href="${country.flags.svg}"></use>
         </svg>
         <p>${country.name.official}</p>
      </div>
    </div>`;
      countryListRef.insertAdjacentHTML('beforeend', markup);
    });
  } else if (countries.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
