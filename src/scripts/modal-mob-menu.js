const openMenuBtn = document.querySelector('[data-mob-menu-open]');
const modalMenu = document.querySelector('[data-modal-mob-menu]');
const clsMenuBtn = document.querySelector('[data-modal-mob-menu-cls]');

openMenuBtn.addEventListener('click', () => {
  modalMenu.classList.remove('visually-hidden');
});

clsMenuBtn.addEventListener('click', () => {
  modalMenu.classList.add('visually-hidden');
});

// Submenu

const descMenu = document.querySelector('.fav-desc-mob');
const subMenuBtn = document.querySelector('.sub-menu-btn');
const containerMenu = document.querySelector('.mob-menu-wrapper');
const mobMenuIcon = document.querySelector('.mob-menu-fav-icon');

const toggleMenu = () => {
  descMenu.classList.toggle('show-desc');
};

subMenuBtn.addEventListener('click', e => {
  //e.stopPropagation();
  toggleMenu();
  mobMenuIcon.classList.toggle('active');
});

containerMenu.addEventListener('click', e => {
  // let menuIsActive = descMenu.classList.contains('show-desc');
  // if (menuIsActive) {
  //   toggleMenu();
  // }
});

// const favLinks = document.querySelectorAll('[data-fav]');
