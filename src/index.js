import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.value = '';
searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const name = e.target.value.trim().toLowerCase();
  fetchCountries(name).then(
    data => (countryInfo.innerHTML = createMarkup(data))
  );
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) =>
        `<div><img src="${svg}" alt="${official}"><h1>${official}</h1></div>`
    )
    .join('');
}
