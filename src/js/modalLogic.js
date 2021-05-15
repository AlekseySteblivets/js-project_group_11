import eventCard from '../templates/eventCard.hbs';
import { refs } from './objects-refs';
import { fetchData } from './serviceApi';

refs.cardListEl.addEventListener('click', onEventsClick);

function onEventsClick(e) {
  const eventId = e.target.id;
  refs.modalWindow.classList.add('is-open');

  fetchData.then(data => {
    const events = data._embedded.events;
    const result = events.find(({ id }) => id === eventId);
    markup(result);
  });
}

function markup(data) {
  refs.modalContainer.innerHTML = eventCard(data);
}

function errror() {
  alert('error');
}
