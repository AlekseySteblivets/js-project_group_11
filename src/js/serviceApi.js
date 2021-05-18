import templCardsForRender from '../templates/templCard.hbs';
import { refs } from './objects-refs';
import tamplateCountryName from '../templates/countryName.hbs';
import arrCountries from './countries-name';


import debounce from 'lodash.debounce';


// ========== PNotify ============================================================
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.addClass = 'my-pnotify';
// ===============================================================================


const KEY = '0PSOw59QQHJn14wudWQZ3vLoS3PmgpC6';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

let defaultEventCountry = '';
let keyword = '';
let fetchData = '';

const countCardOnPage = function getPagesSize() {
  if (window.innerWidth > 768 && window.innerWidth < 1280) {
    return 21;
  } else {
    return 20;
  }
};
// ====================== CHOOSE COUNTRY ==============================================
const arrCountryName = arrCountries.map(country => country.name);
const arrCountryCode = arrCountries.map(country => country.code);

refs.formChooseEl.insertAdjacentHTML(
  'beforeend',
  tamplateCountryName(arrCountryName),
);

refs.formChooseEl.addEventListener('input', formChooseHandler);
function formChooseHandler(e) {
  const index = arrCountryName.indexOf(e.target.value);
  const countryCode = arrCountryCode[index];
  defaultEventCountry = countryCode;
  searchCountryOfName(countryCode);
}
function searchCountryOfName(countryCode) {

  fetchData =    fetch(`${BASE_URL}/events.json?countryCode=${countryCode}&keyword=${keyword}&size=${countCardOnPage()}&apikey=${KEY}`)
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(data => {
            const event = data._embedded.events
            
            urlImage(event);
            appendEventMarkup(event);
            fetchData = event;
        })
        .catch(error => {
            notice({
                text: "В этой стране нет мероприятий! Выберите другую страну!"
                });
            console.log(error)
            
        })
        
};

// ====================================================================================

fetchData = fetch(
  `${BASE_URL}/events.json?countryCode=${defaultEventCountry}&keyword=${keyword}&size=${countCardOnPage()}&apikey=${KEY}`,
)
  .then(res => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  })
  .then(data => {
    return data;
    
  })
  .catch(error => {
    notice({
                text: "Упс! Что-то странное происходит..."
    });
    console.log(error)
  });

fetchData.then(data => {
  const event = data._embedded.events;

  urlImage(event);
 
  appendEventMarkup(event);
  console.log(event);
  fetchData = event;
});
console.log(fetchData);

function appendEventMarkup(event) {
  refs.cardListEl.innerHTML = templCardsForRender(event);
}

function urlImage(event) {
  event.forEach(item => {
    item.images = item.images.find(item => item.ratio === '4_3'); //возвращает первый элемнт, удовлетворяющий условию item.ratio === '4_3' (т.е. уникальный элемент)
  });
  return event;
}

export { fetchData, urlImage };
// 
  
  

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++EventSearchByKeyword++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
refs.formSearchEl.addEventListener('input', debounce(onSearch, 800))

function onSearch(e) {
  let searchQuery = e.target.value;
  keyword = searchQuery;
  fetchData =   fetch(
    `${BASE_URL}/events.json?keyword=${keyword}&countryCode=${defaultEventCountry}&size=${countCardOnPage()}&apikey=${KEY}`,
  
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
    .then(data => {
      urlImage(data)
      console.log(data);
      appendEventMarkup(data)
      fetchData = data;
    })
      
    .catch(error => console.log(error))
}

