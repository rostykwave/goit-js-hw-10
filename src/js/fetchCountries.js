// import countryCard from "../templates/country-card.hbs"
import countryCard from '../templates/country-card.hbs'

function fetchCountries(name) { 

    fetch(`https://restcountries.com/v2/name/${name}?fields=flags,name,capital,population,languages`)
        .then(response => {
        return response.json();
    })
        .then(country => {
            console.log(country);
            let markup = '';
            country.forEach(el => {
                console.log(el.flags.svg);
                console.log(el.name);
                console.log(el.capital);
                console.log(el.population);
                console.log(el.languages);
                // console.log(Object.values(el.languages));

                markup = countryCard(el);
            });
            
    
            
            // const markup = countryCard(country);
            console.log(markup);
    })
        .catch(error => {
        console.log(error);
    });
}

export { fetchCountries };


// https://restcountries.com/v3.1/name/${name}
    //filtered 
// https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population