import './css/styles.css';
import debounce from 'lodash.debounce';
// var debounce = require('lodash.debounce');

///Шаблони
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';


//праця з бекендом
import { fetchCountries } from "./js/fetchCountries";
///Отримання Ref
import getRefs from './js/get-refs';
///Notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';


///Важливі змінні
const DEBOUNCE_DELAY = 300;
///References
const refs = getRefs();



////Main code
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
/////////////////////////////




////Functions
function onSearch(e) {
    console.log('call onSearch');
    //Очищуємо вміст 
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    ///Забираємо інпут в змінну
    const inputName = e.target.value.trim();
    console.log('input: ', inputName.length);
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
    //fetch не вважає 404 помилкою, тому необхідно явно відхилити проміс, щоб можна було зловити і обробити помилку.
    if (country.status === 404) {
        return country.reject('error');
    }

    if (country.length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.");
    }

    ////масив всіх країн, які підходять інпут
    console.log(country);
    
    ///Умова рендерингу списку чи однієї країни
    if (country.length === 1) {
        renderCountryCard(country);
    } else {
        renderCountryList(country);
    }

    

    
}

function onFetchError(error) {
    return Notify.failure("Oops, there is no country with that name");
}



function renderCountryList(country) {
    // console.log(country);
    let markup = '';

    country.forEach((oneCountryFromList) => {
        markup += countryList(oneCountryFromList);
        //   console.log(markup);
    });

    //додавання всього макету одноразово в HTML ul
    refs.countryList.innerHTML = markup;
}




function renderCountryCard(country) {
    const markup = countryCard(country[0]);
        refs.countryInfo.innerHTML = markup;
}






// ???? Як поставити вкінці списку мов крапку замість коми, як реалізувати це макетом
// https://handlebarsjs.com/guide/builtin-helpers.html#if





////done///
////Знайти як дістати значення з об'єкту languages, коли для кожної країни клюя різний
///trim()
////Catch не ловить помилку
///notiflix
///рендеринг списку до 10 країн
///повернути debounce значення 300
///css оформлення
///об'єнати масив мов в один рядок