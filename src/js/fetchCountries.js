const BASE_URL = 'https://restcountries.com/v2';
const FILTER = '?fields=flags,name,capital,population,languages';

function fetchCountries(name) { 
    return fetch(`${BASE_URL}/name/${name}${FILTER}`)
        .then(response => response.json());
}



export { fetchCountries };
