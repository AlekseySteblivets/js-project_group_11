import templCardsForRender from '../templates/templCard.hbs';
import {refs} from './objects-refs';

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
 

const fetchData = fetch(`${BASE_URL}/events.json?countryCode=${defaultEventCountry}&size=${countCardOnPage()}&apikey=${KEY}`)
.then(res => {
    if(!res.ok) {
        throw res;
    }
    return res.json();
     })
     .then (data => {
        const event = data._embedded.events 
        appendEventMarkup(event);
        console.log(data._embedded.events);
        });


console.log(fetchData);

function appendEventMarkup(event) {
    refs.cardListEl.insertAdjacentHTML('beforeend', templCardsForRender(event));
};
