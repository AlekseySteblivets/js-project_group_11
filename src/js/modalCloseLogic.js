import { refs } from './objects-refs';

refs.modalCloseBtn.addEventListener('click', onCloseBtnClick);
window.addEventListener('keydown', onEscClick);
refs.modalWindow.addEventListener('click', onBackDropClick)

function onCloseBtnClick(e) {
    closeModalWindow()
}

function onEscClick(e) {
    if (e.key !== 'Escape') {
        return
    }
    closeModalWindow()
}

function onBackDropClick(e) {
    if (e.target.className === 'modal is-open') {   
        closeModalWindow()
    } 
}

function closeModalWindow() {
    refs.modalWindow.classList.remove('is-open');
}