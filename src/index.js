import './css/styles.css';
import debounce from 'lodash.debounce';

///Шаблони
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';


//праця з бекендом
import { fetchCountries } from "./js/fetchCountries";
///Отримання Refs
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
    //Очищуємо вміст 
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    ///Забираємо інпут в змінну
    const inputName = e.target.value.trim();
    
    ///якщо в інтупі щось є, тоді відправляємо запит
    if (inputName) {
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

    console.log('Countries count: ', country.length);

    if (country.length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.");
    }

    ////масив всіх країн, які підходять для рендеру
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
    });

    //додавання всього макету одноразово в HTML ul
    refs.countryList.innerHTML = markup;
}




function renderCountryCard(country) {
    const markup = countryCard(country[0]);
    refs.countryInfo.innerHTML = lastComaFix(markup);
}






///Функція яка приймає текст макету і забирає зайву кому вкінці переліку мов, коли Switzerland наприклад має 4 мови
function lastComaFix(propMarkup) {
    if (propMarkup.endsWith(', </span></p>')) {
        return propMarkup.replace(", </span></p>", "</span></p>");
    }
}