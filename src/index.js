import './css/styles.css';
import './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const inputHandle = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

inputHandle.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  event.preventDefault();
  countryListRef.innerHTML = '';
  const input = inputHandle.value.trim();
  if (input != '') {
    fetchCountries(input)
      .then(response => {
        if (response.status === 404) {
          throw new Error('404');
        } else {
          createCountriesMarkup(response);
        }
      })
      .catch(error => {
        if (error.message === '404') {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
      });
  }
}

function createCountriesMarkup(countries) {
  if (countries.length === 1) {
    countries.map(country => {
      const markup = `<li class="country-info">
        <div class="country-name-container">
          <img src='${country.flags.svg}' alt='flag' width="50" height="30">
          <p class="country-name-main">${country.name.official}</p>
        </div>
        <p class="country-characteristics"><span class="country-characteristics-value">Capital:</span> ${
          country.capital
        }</p>
        <p class="country-characteristics"><span class="country-characteristics-value">Population:</span> ${
          country.population
        }</p>
        <p class="country-characteristics"><span class="country-characteristics-value">Languages:</span> ${Object.values(
          country.languages
        )}</p>
      </li>`;
      countryListRef.insertAdjacentHTML('beforeend', markup);
    });
  } else if (countries.length < 10) {
    countries.map(country => {
      const markup = `<li class="country-info">
        <div class="country-name-container">
          <img src='${country.flags.svg}' alt='flag' width="40" height="25">
          <p class="country-name">${country.name.official}</p>
        </div>
      </li>`;
      countryListRef.insertAdjacentHTML('beforeend', markup);
    });
  } else if (countries.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
