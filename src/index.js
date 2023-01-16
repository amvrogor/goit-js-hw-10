import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// const countryListItem = document.querySelectorAll('.country-list-item');
// const countryInfoName = document.querySelector('.country-info-name');
// const countryInfoItem = document.querySelectorAll('.country-info-item');
// const img = document.querySelectorAll('img');

countryList.style.listStyle = 'none';
countryList.style.fontSize = '12px';
countryList.style.padding = '0px';

// countryListItem.forEach(e => {
//   e.style.display = 'flex';
// });

searchBox.value = '';
searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const name = e.target.value.trim().toLowerCase();
  if (name === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = createMarkupTen(data);
      } else if ((data.length = 1)) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = createMarkupOne(data);
      }
    })
    .catch(error => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
  // .finally(error => console.log(error));
}

function createMarkupTen(arr) {
  return arr
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country-list-item" style="display:flex; align-items:end; margin-bottom:5px">        
          <img src="${svg}" alt="${official}" width = 50 style="margin-right:10px">
          <h2 style="margin:0">${official}</h2>       
        </li>`
    )
    .join('');
}

function createMarkupOne(arr) {
  return arr
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) =>
        `<div class="country-info-name" style="display:flex; align-items:end">
    <img src="${svg}" alt="${official}" width=100 style="margin-right:10px">
    <h1 style="margin:0; font-size:30px">${official}</h1>
    </div>
    <div class="country-info-text">
    <h2>Capital:<span class="country-info-item" style="font-weight: lighter"> ${capital}</span></h2>
    <h2>Population:<span class="country-info-item" style="font-weight: lighter"> ${population}</span></h2>
    <h2>Languages:<span class="country-info-item" style="font-weight: lighter"> ${Object.values(
      languages
    ).join(', ')}</span></h2>
    </div>`
    )
    .join('');
}
