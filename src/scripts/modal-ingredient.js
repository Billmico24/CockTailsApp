import { requestIngredient } from './requests';
import { getIngredientPattern, loaderPattern } from './common/patterns';
import { checkUserStatus } from './common/general';
import PerfectScrollbar from 'perfect-scrollbar';

const refs = {
  modalWindow: document.querySelector('[data-modal-ingredient-window]'),
  modalContentEl: document.querySelector('[data-modal-ingredient-content]'),
  modal: document.querySelector('[data-modal-ingredient]'),
  modalCocktail: document.querySelector('.modal-cocktail'),
  galleryListEl: document.querySelector('.gallery-list'),
};

const psModal = new PerfectScrollbar(refs.modalWindow, {
  wheelSpeed: 0.1,
  swipeEasing: 'linear',
});

refs.modalCocktail.addEventListener('click', e => {
  if (!e.target.hasAttribute('data-ingredientname')) return;

  const ingredientName = e.target.getAttribute('data-ingredientname');

  refs.modalContentEl.innerHTML = loaderPattern;
  refs.modal.classList.toggle('is-hidden');

  requestIngredient({ ingredientName: ingredientName })
    .then(response => {
      renderContent(response.data.ingredients[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

refs.galleryListEl.addEventListener('click', e => {
  if (
    e.target.classList.contains('button-more') &&
    e.target.hasAttribute('data-ingredientname')
  ) {
    refs.modalContentEl.innerHTML = loaderPattern;
    refs.modal.classList.toggle('is-hidden');

    const ingredientName = e.target.getAttribute('data-ingredientname');

    requestIngredient({ ingredientName: ingredientName })
      .then(response => {
        renderContent(response.data.ingredients[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }
});

const renderContent = data => {
  refs.modalWindow.scrollTop = 0;

  const ingredientData = {
    id: data.idIngredient,
    country: '',
    alcohol: data.strAlcohol,
    title: data.strIngredient,
    subtitle: '',
    description: data.strDescription,
    abv: data.strABV,
    type: data.strType,
    ingredient: data.strIngredient,
  };

  checkUserStatus(renderData, ingredientData);
};

function renderData(userData, ingredientData) {
  const content = getIngredientPattern(userData, ingredientData);
  refs.modalContentEl.innerHTML = content;

  finalizeModal();
}

const finalizeModal = () => {
  psModal.update();
};
