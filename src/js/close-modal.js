window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
        refs.modalEl.style.display = 'none';
        refs.modalEl.removeChild(bigImg);
    }
});

refs.modalEl.addEventListener('click', (e) => {
    if (e.target.localName !== 'img') {
        refs.modalEl.style.display = 'none';
        refs.modalEl.removeChild(bigImg);
    }
});