import templCardsForRender from '../templates/templCard.hbs';
import { refs } from './objects-refs';
import tamplateCountryName from '../templates/countryName.hbs';
import arrCountries from './countries-name';

// ========== PNotify ============================================================
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.addClass = 'my-pnotify';

const KEY = '0PSOw59QQHJn14wudWQZ3vLoS3PmgpC6';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

let defaultEventCountry = 'US';

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
  searchCountryOfName(countryCode);
}
function searchCountryOfName(countryCode) {

    fetch(`${BASE_URL}/events.json?countryCode=${countryCode}&size=${countCardOnPage()}&apikey=${KEY}`)
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
            
        })
        .catch(error => {
            notice({
                text: "В этой стране нет мероприятий! Выберите другую страну!",
                style: 'top: 0',
                });
            console.log(error)
        })
};
// ====================================================================================

const fetchData = fetch(
  `${BASE_URL}/events.json?countryCode=${defaultEventCountry}&size=${countCardOnPage()}&apikey=${KEY}`,
)
  .then(res => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  })
  .then(data => {
    return data;
  });

fetchData.then(data => {
  const event = data._embedded.events;

  urlImage(event);
  // console.log(templCardsForRender(event));
  appendEventMarkup(event);
  console.log(event);
  // searchImageForRenderCard(event);
});
console.log(fetchData);

function appendEventMarkup(event) {
  // refs.cardListEl.insertAdjacentHTML('beforeend', templCardsForRender(event));
  refs.cardListEl.innerHTML = templCardsForRender(event);
}

// function searchImageForRenderCard (array) {
//     array.forEach(item => {
//         if(item.ratio === '4_3') {
//             return item.url;
//         }
//         console.log(item.url);
//     })

// }

function urlImage(event) {
  event.forEach(item => {
    //  console.log(item.images); // достучались до массива объектов images
    item.images = item.images.find(item => item.ratio === '4_3'); //возвращает первый элемнт, удовлетворяющий условию item.ratio === '4_3' (т.е. уникальный элемент)
    // console.log(item.images = item.images.find(item => item.ratio === '4_3'));
  });
  return event;
}

export { fetchData, urlImage };
