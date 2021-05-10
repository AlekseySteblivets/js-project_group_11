
import { refs } from './objects-refs';

refs.formChooseEl.addEventListener('focus', onCountryChoose);

function onCountryChoose() {
    refs.countryInputEl.classList.add('input-country--active');
};