import eventCard from '../templates/eventCard.hbs';
import { refs } from './objects-refs';


const KEY = '0PSOw59QQHJn14wudWQZ3vLoS3PmgpC6';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

refs.cardListEl.addEventListener('click', onEventsClick);

function onEventsClick(e) {
  const eventId = e.target.id;
  console.log(eventId);
  fetch(`${BASE_URL}/events/${eventId}.json?&apikey=${KEY}`)
    .then(res => res.json())
    .then(data => {
      markup(data);
      const infoContainer = document.querySelector('.info-container__img');
      const postContainer = document.querySelector('.info-wrapper__poster');
      infoContainer.innerHTML = `<img src=${data.images[6].url} class="poster-img">`;
      postContainer.innerHTML = `<img src=${data.images[2].url}>`
    })
    .catch(error => console.log(error));
  
  refs.modalWindow.classList.add('is-open');
};

function markup(data) {
  refs.modalContainer.innerHTML = eventCard(data);
};


