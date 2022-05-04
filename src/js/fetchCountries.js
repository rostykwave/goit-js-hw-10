function fetchCountries(name) { 
    console.log('hello');
    const r = fetch('https://restcountries.com/v3.1/name/ukraine');
        
        console.log(r);
}

export { fetchCountries };