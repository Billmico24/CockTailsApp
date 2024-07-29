import { createRequstByLetter } from './hero_api';
import { outputPagination } from '../scripts/common/general';

const alphabetContainer = document.querySelector('.container-alphabet');
const selector = document.querySelector('.custom-select');
const galleryError = document.querySelector('.gallery-error');

const refs = {
  galleryList: document.querySelector('.gallery-list'),
  galleryTitle: document.querySelector('h1.gallery-title'),
  errorSection: document.querySelector('[data-error-section]'),
  paginationEl: document.querySelector('#tui-pagination-container'),
};

if (alphabetContainer) {
  alphabetContainer.addEventListener('click', onLetterClick);
  selector.addEventListener('change', onLetterChoose);
}

export function onLetterClick(evt) {
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }

  const currentLetter = evt.target.textContent;
  createRequstByLetter(currentLetter).then(data =>
    galleryCardsRender(data.drinks)
  );
}

export function onLetterChoose(evt) {
  const selectedOption = evt.target.options[evt.target.selectedIndex];

  const selectedOptionText = selectedOption.textContent;

  createRequstByLetter(selectedOptionText).then(data => {
    galleryCardsRender(data.drinks);
  });
}

function galleryCardsRender(data) {
  if (!data) {
    refs.galleryList.innerHTML = ``;
    refs.galleryTitle.classList.add('visually-hidden');
    refs.galleryList.classList.add('visually-hidden');
    refs.errorSection.classList.remove('visually-hidden');
    refs.paginationEl.classList.add('visually-hidden');
    return;
  }
  galleryError.innerHTML = '';

  outputPagination(data, 'search');
}
