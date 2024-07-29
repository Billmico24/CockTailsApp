function backToTop() {
  const button = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      button.style.opacity = 1;
    } else {
      button.style.opacity = 0;
    }
  });

  button.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

backToTop();
