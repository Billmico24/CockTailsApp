const getCocktailPattern = (
  userData,
  { id, title, image, instructions, ingredients }
) => {
  let action = '';
  let buttonName = 'Add to favorite';

  if (Object.keys(userData).length !== 0) {
    if (userData.cocktails[id]) {
      action = `data-action="delete"`;
      buttonName = `Remove from favorite`;
    }
  }

  const pattern1 = `
    <div class="modal-cocktail__content">
      <!--------- Name and Instructions for mobile version --------->
      <div>
        <h2 class="modal-cocktail__title hidden-in-tablet">${title}</h2>
        <h3 class="modal-cocktail__subtitle hidden-in-tablet">Instructions:</h3>
        <p class="modal-cocktail__text">
          ${instructions}
        </p>
      </div>
      <!--------- Name and Instructions for mobile version--------->

      <div class="modal-cocktail__card">
        <img
          class="modal-cocktail__img"
          src="${image}"
          alt="${title}"
          width="280px"
          height="280px"
        />

        <div class="modal-cocktail__bigcard">
          <h2 class="modal-cocktail__title hidden-in-mobile">${title}</h2>
          <h3 class="sub-ingredients">Ingredients:</h3>
          <p class="modal-cocktail__smalltitle">Per cocktail</p>
          <ul class="modal-cocktail__list">
  `;

  const pattern2 = ingredients.map(ingredient => {
    return `<li class="lish">
        <a
          href="#"
          class="modal-cocktail__link"
          data-ingredientname="${ingredient}"
          >✶ ${ingredient}</a
        >
      </li>`;
  });

  const pattern3 = `
          </ul>
        </div>
      </div>

      <!--------- Instructions shown in tablet and desktop --------->
      <div class="modal-cocktail__tabinstructions">
        <h3 class="modal-cocktail__subtitle hidden-in-mobile">Instructions:</h3>
        <p class="hidden-in-mobile modal-cocktail__text">
          ${instructions}
        </p>
      </div>
      <!--------- Instructions shown in tablet and desktop --------->

      <div
        class="modal-cocktail-button-wrapper"
      >
        <!--------- Add to favorite button --------->
        <button
          type="button"
          class="button-more button-modal-cocktail"
          data-add-remove-favorite
          data-cocktailid="${id}"
          data-element-type="cocktail"
          data-element-id="${id}"
          data-element-image="${image}"
          data-element-title="${title}"
          ${action}
        >
          ${buttonName}
        </button>
        <!--------- Add to favorite button --------->
      </div>
    </div>
  `;

  return pattern1 + pattern2.join('') + pattern3;
};

const getIngredientPattern = (
  userData,
  { id, title, country, subtitle, description, type, ingredient, abv }
) => {
  let action = '';
  let buttonName = 'Add to favorite';

  if (Object.keys(userData).length !== 0) {
    if (userData.ingredients[id]) {
      action = `data-action="delete"`;
      buttonName = `Remove from favorite`;
    }
  }

  const pattern1 = `
    <div class="modal-ingr__content" id="ingredient-${id}">
      <h2 class="modal-ingr__title ingr-title">${title}</h2>
      <h3 class="modal-ingr__subtitle ingr-subtitle">${type || ''}</h3>
      <div class="modal-ingr__horiontal-line"></div>
      <div>
        <p class="modal-ingr__description">
          ${description || ''}
        </p>
        <ul class="modal-ingr__list">
  `;

  let patternType = ``;
  if (type)
    patternType = `
      <li class="modal-ingr__list__item">
        <span class="modal-ingr__list__item__star">✶ </span>Type: ${type}
      </li>
    `;

  let patternCountry = ``;
  if (country)
    patternCountry = `
      <li class="modal-ingr__list__item">
        <span class="modal-ingr__list__item__star">✶ </span>Country of
        origin: ${country}
      </li>
    `;

  let patternABV = ``;
  if (abv)
    patternABV = `
      <li class="modal-ingr__list__item">
        <span class="modal-ingr__list__item__star">✶ </span>Alcohol by
        volume: ${abv}
      </li>
    `;

  let patternIngredient = ``;
  if (ingredient)
    patternIngredient = `
      <li class="modal-ingr__list__item">
        <span class="modal-ingr__list__item__star">✶ </span>Flavour: ${ingredient},
        spicy and sweet
      </li>
    `;

  // const pattern2 = '';
  const pattern2 =
    patternType + patternCountry + patternABV + patternIngredient;

  const pattern3 = `
        </ul>
      </div>
      <div
        class="modal-ingr__btns"
      >
        <button
          type="button"
          class="button-more modal-ingr__btn"
          data-add-remove-favorite
          data-ingredientid="${id}"
          ${action}
          data-element-type="ingredient"
          data-element-id="${id}"
          data-element-title="${title}"
          data-element-subtitle="${type}"
        >
          ${buttonName}
        </button>
      </div>
    </div>
  `;

  return pattern1 + pattern2 + pattern3;
};

const loaderPattern = `
  <div data-loader='' class="loader-type1"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
`;

const getUserAreaPattern = ({ email = '', authorized = false }) => {
  if (authorized) {
    return `
      <div>Logged in as <span class="user__email" data-user-email>${email}</span></div>
      <button class="button-authorization user__button" type="button" data-logout-button>
        Logout
      </button>
    `;
  }

  return `
      <button class="button-authorization user__button" type="button" data-login-button>
        Login
      </button>
    `;
};

const getAddedMessagePattern = ({ type, name }) => {
  const text = type == 'cocktail' ? 'Cocktail' : 'Ingredient';
  return `
    ${text} <strong>${name}</strong> successfully added to your favorites.
  `;
};

const getRemovedMessagePattern = ({ type, name }) => {
  const text = type == 'cocktail' ? 'Cocktail' : 'Ingredient';
  return `
    ${text} <strong>${name}</strong> removed from your favorites.
  `;
};

const getFavoriteIngredientPattern = ({ id, title, subtitle }) => {
  return `
    <li id="ingredient-${id}" class="gallery-item favorite-ingredient__item">
      <h2 class="gallery-item__title gallery-item__title_margin favorite-ingredient__title ingr-title">${title}</h2>
      <h3 class="gallery-item__title gallery-item__title_margin favorite-ingredient__subtitle ingr-subtitle">${
        subtitle || '&nbsp;'
      }</h3>
      <div class="button-container">
        <button class="button-more" type="button" data-ingredientname="${title}">Learn More</button>
        <button class="button-favorite" data-ingredientname="${title}" data-ingredientid="${id}" data-add-remove-favorite="" data-element-type="ingredient" data-card-type="favorite" type="button" data-action="delete">
          <span>Remove</span>
          <svg class="button-favorite__icon" xmlns="http://www.w3.org/2000/svg" width="21" height="19" fill="none"><path fill="#FD5103" d="m10.5 19-1.523-1.367C3.57 12.798 0 9.61 0 5.695 0 2.505 2.541 0 5.775 0c1.827 0 3.58.839 4.725 2.164A6.324 6.324 0 0 1 15.225 0C18.459 0 21 2.506 21 5.695c0 3.914-3.57 7.103-8.977 11.949L10.5 19Z"/><path  d="m10.5 17-1.232-1.079C4.89 12.104 2 9.586 2 6.496 2 3.978 4.057 2 6.675 2c1.479 0 2.898.662 3.825 1.708A5.175 5.175 0 0 1 14.325 2C16.943 2 19 3.978 19 6.496c0 3.09-2.89 5.607-7.268 9.433L10.5 17Z"/></svg>
        </button>
      </div>
    </li>
  `;
};

export {
  getCocktailPattern,
  getIngredientPattern,
  loaderPattern,
  getUserAreaPattern,
  getAddedMessagePattern,
  getRemovedMessagePattern,
  getFavoriteIngredientPattern,
};
