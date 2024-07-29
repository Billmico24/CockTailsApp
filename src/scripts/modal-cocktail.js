import { requestCocktail } from './requests';
import { getCocktailPattern, loaderPattern } from './common/patterns';
import { checkUserStatus } from './common/general';
import PerfectScrollbar from 'perfect-scrollbar';

const refs = {
  galleryListEl: document.querySelector('.gallery-list'),
  modal: document.querySelector('[data-modal-cocktail]'),
  modalWindow: document.querySelector('[data-modal-cocktail-window]'),
  modalContentEl: document.querySelector('[data-modal-cocktail-content]'),
};

const psModal = new PerfectScrollbar(refs.modalWindow);

refs.galleryListEl.addEventListener('click', e => {
  if (
    e.target.classList.contains('button-more') &&
    e.target.hasAttribute('data-cocktailid')
  ) {
    refs.modalContentEl.innerHTML = loaderPattern;
    refs.modal.classList.toggle('is-hidden');

    const cocktailId = e.target.dataset.cocktailid;

    requestCocktail({ cocktailId: cocktailId })
      .then(response => {
        renderContent(response.data.drinks[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }
});

const renderContent = data => {
  refs.modalWindow.scrollTop = 0;

  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`]) ingredients.push(data[`strIngredient${i}`]);
  }

  const cocktailData = {
    id: data.idDrink,
    title: data.strDrink,
    image: data.strDrinkThumb,
    alcohol: data.strAlcoholic,
    category: data.strCategory,
    instructions: data.strInstructions,
    ingredients: ingredients,
  };

  checkUserStatus(renderData, cocktailData);
};

function renderData(userData, cocktailData) {
  const content = getCocktailPattern(userData, cocktailData);
  refs.modalContentEl.innerHTML = content;

  finalizeModal();
}

const finalizeModal = () => {
  psModal.update();
};
