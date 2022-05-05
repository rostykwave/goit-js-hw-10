const BASE_URL = 'https://restcountries.com/v2';
const FILTER = '?fields=flags,name,capital,population,languages';
// const FILTER = '';

function fetchCountries(name) { 
    return fetch(`${BASE_URL}/name/${name}${FILTER}`)
        .then(response => response.json());
}




export { fetchCountries };

///api-service.js - інша назва для цього файлу
