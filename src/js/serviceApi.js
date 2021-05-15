import templCardsForRender from '../templates/templCard.hbs';
import { refs } from './objects-refs';
const debounce = require('lodash.debounce');


const KEY = '0PSOw59QQHJn14wudWQZ3vLoS3PmgpC6';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';


const defaultEventCountry = 'US';

const countCardOnPage =  function getPagesSize () {
    if(window.innerWidth > 768 && window.innerWidth < 1280 ) {
         return  21;
    }
    else {
        return 20;
    }
   
}
// -------------------------------------- logic input by keyword------------>



refs.formSearchEl.addEventListener('input', debounce(onSearch, 800))

function onSearch(e) {
    e.preventDefault();

    let searchQuery = e.target.value;

    const fetchData = fetch(
        `${BASE_URL}/events.json?keyword=${searchQuery}&size=${countCardOnPage()}&apikey=${KEY}`,
    )
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(data => {
    
            return data._embedded.events;
      
        })
        .then(data => appendEventMarkup(data))
        .catch(error => console.log(error))
        .finally(() => setTimeout(() => {
            refs.formSearchEl.value = '';
        }, 1000));


}


// ------------------------------------------------------------------------------------->


function appendEventMarkup(event) {
    refs.cardListEl.innerHTML = templCardsForRender(event);
};