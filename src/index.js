import './css/styles.css';
import './fetchCountries';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const inputHandle = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputHandle.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  event.preventDefault();
  const input = inputHandle.value.trim();
  if (input === '') {
    return;
  } else {
    fetchCountries(input).then(result =>
      result.map(country => createCountriesMarkup(country))
    );
  }
}

function createCountriesMarkup(country) {
  const markup = `<div class="country-info">
      <div>
        <svg>
          <use href="${country.flags.svg}"></use>
         </svg>
         <p>${country.name.official}</p>
      </div>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${country.languages}</p>
    </div>`;
  countryListRef.insertAdjacentHTML('beforeend', markup);
  console.log(country.languages);
}
