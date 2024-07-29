const themeBtn = document.querySelectorAll('.toggler');
//const themeActive = document.querySelector('toggler.active');

themeBtn.forEach(el => {
  el.addEventListener('click', () => {
    saveTheme(el);
  });
});

// function selectTheme() {
//   themeBtn.forEach(el => {
//     el.classList.toggle('active');
//     document.body.classList.toggle('dark-mode');
//   });
// }

function saveTheme(el) {
  let theme;

  if (document.body.classList.contains('dark-mode')) {
    theme = 'DARK';
    themeBtn.forEach(el => {
      el.classList.add('active');
    });
  } else {
    theme = 'LIGHT';
    themeBtn.forEach(el => {
      el.classList.remove('active');
    });
  }
  localStorage.setItem('PageTheme', JSON.stringify(theme));
}

let getTheme = JSON.parse(localStorage.getItem('PageTheme'));

if (getTheme === 'DARK') {
  document.body.classList = 'dark-mode';
  themeBtn.forEach(el => {
    el.classList.add('active');
  });
}
