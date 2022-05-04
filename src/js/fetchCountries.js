function fetchCountries(name) { 
    // console.log('hello');
    // const r = fetch('https://restcountries.com/v3.1/name/ukraine');
        
    //     console.log(r);
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
        return response.json();
    })
        .then(country => {
        console.log(country);
    })
        .catch(error => {
        console.log(error);
    });
}

export { fetchCountries };


// https://restcountries.com/v3.1/name/${name}
// https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population