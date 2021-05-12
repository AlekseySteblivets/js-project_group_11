import eventCard from '../templates/eventCard.hbs';
import { refs } from './objects-refs';

refs.cardListEl.addEventListener('click', onEventsClick);

function onEventsClick(e) {
  const id = e.target.id;
  refs.modalWindow.classList.add('is-open');

  fetchUrl(id).then(markup);
}

function fetchUrl(id) {
  const KEY = '0PSOw59QQHJn14wudWQZ3vLoS3PmgpC6';
  const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${KEY}`;

  return fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

function markup(data) {
  refs.modalContainer.insertAdjacentHTML('beforeend', eventCard(data));
}
