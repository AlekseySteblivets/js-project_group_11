import { refs } from './objects-refs';

window.onscroll = function () {
  scrollFunction()
};

refs.toTop.addEventListener('click', (e) => {
  console.log(e);
    scrollFunction()
     window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
})
  function scrollFunction() {
  let bodyScrollTop = document.body.scrollTop;
  let elementScrollTop = document.documentElement.scrollTop;

  if (bodyScrollTop > 500 || elementScrollTop > 500) {
     refs.toTop.style.display = 'block';
  } else {
     refs.toTop.style.display = 'none';
  }
}
