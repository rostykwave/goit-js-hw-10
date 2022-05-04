import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;

console.log(fetchCountries('ukraine'));
console.log(fetchCountries('germany'));
