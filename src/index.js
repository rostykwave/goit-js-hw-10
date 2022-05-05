import './css/styles.css';

import countryCard from './templates/country-card.hbs'
import { fetchCountries } from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;

///References
const refs = {
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
}

////Main code

// fetchCountries('ukraine');
// fetchCountries('germany');
fetchCountries('italy').then(renderCountryInfo).catch(error => console.log(error));




////Functions
function renderCountryInfo(country) {
    const markup = countryCard(country[0]);
     refs.countryInfo.innerHTML = markup;
}



////Знайти як дістати значення з об'єкту languages, коли для кожної країни клюя різний///done
