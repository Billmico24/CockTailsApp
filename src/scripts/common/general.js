import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import Pagination from 'tui-pagination';

const refs = {
  galleryList: document.querySelector('.gallery-list'),
  galleryTitle: document.querySelector('h1.gallery-title'),
  paginationEl: document.querySelector('#tui-pagination-container'),
  errorSection: document.querySelector('[data-error-section]'),
  mainPageTitle: document.querySelector('h1.gallery-title'),
};

const normalizeURI = window.location.pathname.replace(
  '/goit_js_team_project',
  ''
);

const firebaseConfig = {
  apiKey: 'AIzaSyCTBJG-qoCxnqY0kLartne6JuIMgO3rCtI',
  authDomain: 'exo-code.firebaseapp.com',
  projectId: 'exo-code',
  storageBucket: 'exo-code.appspot.com',
  messagingSenderId: '1058079447675',
  appId: '1:1058079447675:web:a8a6c524a829fb1f4160de',
  databaseURL:
    'https://exo-code-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

const getFirebaseDataByUser = async () => {
  let favorites = [];

  const nodeRef = ref(db, `favorites`);

  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    if (!user) {
      reject();
    }

    onValue(nodeRef, snapshot => {
      const data = snapshot.val();

      for (const uid in data) {
        if (user && user.uid === uid) {
          const cocktails = data[uid].cocktails;
          if (cocktails) favorites.cocktails = cocktails;

          const ingredients = data[uid].ingredients;
          if (ingredients) favorites.ingredients = ingredients;
        }
      }

      resolve(favorites);
    });
  });
};

function checkUserStatus(callback, galleryElements, type) {
  const userDataPromise = getFirebaseDataByUser();

  userDataPromise
    .then(userData => {
      callback(userData, galleryElements, type);
    })
    .catch(() => callback([], galleryElements, type));
}

function createGalleryElements(userData, galleryElements, type) {
  const markup1 = galleryElements.map(
    ({ strDrinkThumb, strDrink, idDrink }) => {
      let action = '';
      let buttonName = 'Add to';

      if (Object.keys(userData).length !== 0) {
        if (userData.cocktails[idDrink]) {
          action = `data-action="delete"`;
          buttonName = `Remove`;
        }
      }

      return `
        <li class="gallery-item" id="cocktail-${idDrink}">
          <img class="gallery-item__img_margin gallery-item__img" src="${strDrinkThumb}" alt="${strDrink} photo" />
          <h2 class="gallery-item__title gallery-item__title_margin">${strDrink}</h2>
          <div class="button-container">
            <button class="button-more" type="button" data-cocktailid="${idDrink}">Learn More</button>
            <button class="button-favorite"
              data-cocktailid="${idDrink}" 
              data-add-remove-favorite="" 
              data-element-type="cocktail" 
              data-element-id="${idDrink}" 
              data-element-image="${strDrinkThumb}"
              data-element-title="${strDrink}"
              data-favorite-button-${idDrink}
              type="button" ${action}>
              <span>${buttonName}</span>
              <svg class="button-favorite__icon" xmlns="http://www.w3.org/2000/svg" width="21" height="19" fill="none"><path fill="#FD5103" d="m10.5 19-1.523-1.367C3.57 12.798 0 9.61 0 5.695 0 2.505 2.541 0 5.775 0c1.827 0 3.58.839 4.725 2.164A6.324 6.324 0 0 1 15.225 0C18.459 0 21 2.506 21 5.695c0 3.914-3.57 7.103-8.977 11.949L10.5 19Z"/><path  d="m10.5 17-1.232-1.079C4.89 12.104 2 9.586 2 6.496 2 3.978 4.057 2 6.675 2c1.479 0 2.898.662 3.825 1.708A5.175 5.175 0 0 1 14.325 2C16.943 2 19 3.978 19 6.496c0 3.09-2.89 5.607-7.268 9.433L10.5 17Z"/></svg>
            </button>
          </div>
        </li>
      `;
    }
  );

  outputPaginationDo(markup1, type);
}

function outputPagination(galleryElements, type) {
  return checkUserStatus(createGalleryElements, galleryElements, type);
}

function outputPaginationDo(allItems, type) {
  const totalItems = allItems.length;
  const itemsPerPage = getItemsPerPage();
  const pagesNumber = Math.ceil(totalItems / itemsPerPage);
  checkPaginationVisible(pagesNumber);
  checkNoResultsVisible(totalItems);

  options.totalItems = totalItems;
  options.itemsPerPage = itemsPerPage;

  const pagination = new Pagination(container, options);

  refs.galleryList.innerHTML = allItems.slice(0, itemsPerPage).join('');

  if (type === 'search') {
    const element = document.getElementById('cards');
    element.scrollIntoView();
    refs.mainPageTitle.textContent = 'Cocktails';
  }

  pagination.on('afterMove', event => {
    const currentPage = event.page;

    const startKey = (currentPage - 1) * itemsPerPage;
    const endKey = startKey + itemsPerPage;

    const selectedItems = allItems.slice(startKey, endKey);

    refs.galleryList.innerHTML = selectedItems.join('');
  });
}

//////////////////////////////////////////////////

async function markupGalleryTwo2(data) {
  return await getFirebaseDataByUser();
}

function markupIngredients(data) {
  return data.map(({ id, title, subtitle }) => {
    return `
    <li id="ingredient-${id}" class="gallery-item favorite-ingredient__item">
      <h2 class="gallery-item__title gallery-item__title_margin favorite-ingredient__title ingr-title">${title}</h2>
      <h3 class="gallery-item__title gallery-item__title_margin favorite-ingredient__subtitle ingr-subtitle">${
        subtitle || '&nbsp;'
      }</h3>
      <div class="button-container">
        <button class="button-more" type="button" data-ingredientname="${title}">Learn More</button>
        <button class="button-favorite"
          data-ingredientname="${title}" 
          data-ingredientid="${id}" 
          data-add-remove-favorite="" 
          data-card-type="favorite" 
          type="button" 
          data-action="delete"
          data-element-type="ingredient" 
          data-element-id="${id}" 
          data-element-title="${title}" 
          data-element-subtitle=""${subtitle || ''}" 
        >
          <span>Remove</span>
          <svg class="button-favorite__icon" xmlns="http://www.w3.org/2000/svg" width="21" height="19" fill="none"><path fill="#FD5103" d="m10.5 19-1.523-1.367C3.57 12.798 0 9.61 0 5.695 0 2.505 2.541 0 5.775 0c1.827 0 3.58.839 4.725 2.164A6.324 6.324 0 0 1 15.225 0C18.459 0 21 2.506 21 5.695c0 3.914-3.57 7.103-8.977 11.949L10.5 19Z"/><path  d="m10.5 17-1.232-1.079C4.89 12.104 2 9.586 2 6.496 2 3.978 4.057 2 6.675 2c1.479 0 2.898.662 3.825 1.708A5.175 5.175 0 0 1 14.325 2C16.943 2 19 3.978 19 6.496c0 3.09-2.89 5.607-7.268 9.433L10.5 17Z"/></svg>
        </button>
      </div>
    </li>
  `;
  });
}

// Pagination
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('tui-pagination-container');

const options = {
  // below default value of options
  totalItems: 0,
  itemsPerPage: 6,
  visiblePages: 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// function outputPagination(drinks) {
//   markupGalleryTwo(drinks).then(allItems => {
//     outputPaginationData(allItems);
//   });
// }

function outputPaginationFirebase(allItems) {
  outputPaginationData(allItems);
}

function outputPaginationIngredients(items) {
  const markupItems = markupIngredients(items);
  outputPaginationData(markupItems);
}

function outputPaginationData(allItems) {
  const totalItems = allItems.length;
  const itemsPerPage = getItemsPerPage();
  const pagesNumber = Math.ceil(totalItems / itemsPerPage);
  checkPaginationVisible(pagesNumber);

  options.totalItems = totalItems;
  options.itemsPerPage = itemsPerPage;

  const pagination = new Pagination(container, options);

  refs.galleryList.innerHTML = allItems.slice(0, itemsPerPage).join('');

  pagination.on('afterMove', event => {
    const currentPage = event.page;

    const startKey = (currentPage - 1) * itemsPerPage;
    const endKey = startKey + itemsPerPage;

    const selectedItems = allItems.slice(startKey, endKey);

    refs.galleryList.innerHTML = selectedItems.join('');
  });
}

function checkPaginationVisible(pagesNumber) {
  if (pagesNumber > 1) {
    refs.paginationEl.classList.remove('visually-hidden');
  } else {
    refs.paginationEl.classList.add('visually-hidden');
  }

  if (pagesNumber) {
    refs.errorSection.classList.add('visually-hidden');
  } else {
    refs.errorSection.classList.add('visually-hidden');
  }
}

function checkNoResultsVisible(totalItems) {
  if (!totalItems) return;

  refs.galleryTitle.classList.remove('visually-hidden');
  refs.galleryList.classList.remove('visually-hidden');
}

function getItemsPerPage() {
  const windowWidth = window.innerWidth;
  let itemsPerPage = 3;
  if (windowWidth >= 768) itemsPerPage = 6;
  if (windowWidth >= 1280) itemsPerPage = 9;
  return itemsPerPage;
}

export {
  outputPagination,
  outputPaginationFirebase,
  outputPaginationIngredients,
  checkUserStatus,
};
