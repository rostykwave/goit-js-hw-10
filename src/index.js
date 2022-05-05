import './css/styles.css';
import debounce from 'lodash.debounce';
// var debounce = require('lodash.debounce');
import countryCard from './templates/country-card.hbs';
//праця з бекендом
import { fetchCountries } from "./js/fetchCountries";
///Отримання Ref
import getRefs from './js/get-refs';



///Важливі змінні
const DEBOUNCE_DELAY = 1000;

///References
const refs = getRefs();


////Main code
// console.log(refs.searchInput);
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));



// fetchCountries('ukraine');
// fetchCountries('germany');
// fetchCountries('italy').then(renderCountryInfo).catch(error => console.log(error));




////Functions
function onSearch(e) {
    console.log('call onSearch');
    //Очищуємо вміст інформації про країну
    refs.countryInfo.innerHTML = '';
    ///Забираємо інпут в змінну
    const inputName = e.target.value;
    console.log('input: ', inputName);
    ///якщо в інтупі щось є, тоді відправляємо запит
    if (inputName) {
        console.log('fetch');
        fetchCountries(inputName)
            .then(renderCountryInfo)
            .catch(onFetchError)
            .finally(() => { console.log('Запит здійснено'); }); 
    }
    
}


function renderCountryInfo(country) {
    ////масив всіх країн, які підходять інпут
    console.log(country);
    
    ////рендеринг лише однієї(першої країни), коли інпут повністю співпадає з назною і є лише один, в іншому випадку - альтернативний рендеринг
    const markup = countryCard(country[0]);
     refs.countryInfo.innerHTML = markup;
}

function onFetchError(error) {
    alert('Введені даніневірні');
    console.log('Введені даніневірні');

    // console.log(error);
}



////Catch не ловить помилку
///повернути debounce значення 300
///рендеринг списку до 10 країн
///notiflix
///trim()
///css оформлення



////done///
////Знайти як дістати значення з об'єкту languages, коли для кожної країни клюя різний