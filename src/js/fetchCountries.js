// import countryCard from '../templates/country-card.hbs'

function fetchCountries(name) { 
    return fetch(`https://restcountries.com/v2/name/${name}?fields=flags,name,capital,population,languages`)
        .then(response => {
            return response.json();
        });
}




export { fetchCountries };