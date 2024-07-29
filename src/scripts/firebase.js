// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';
// import { getDatabase, ref, set, remove, onValue } from 'firebase/database';
// import {
//   getUserAreaPattern,
//   getAddedMessagePattern,
//   getRemovedMessagePattern,
//   loaderPattern,
// } from './common/patterns';
// import {
//   outputPagination,
//   outputPaginationIngredients,
// } from './common/general';

// const nomalizeURI = window.location.pathname.replace(
//   '/goit_js_team_project',
//   ''
// );

// const refs = {
//   userAreaEl: document.querySelector('[data-user-area]'),
//   modalAuthentication: document.querySelector('[data-modal-authentication]'),
//   modalSuccessfull: document.querySelector('[data-modal-successfull]'),
//   loginBtn: document.querySelector('[data-modal-login-button]'),
//   joinBtn: document.querySelector('[data-modal-join-button]'),
//   loginForm: document.querySelector('[data-login-form]'),
//   joinForm: document.querySelector('[data-join-form]'),
//   wellcomeEl: document.querySelector('[data-wellcome]'),
//   modalLoader: document.querySelector('[data-modal-authentication-loader]'),
//   modalSuccessfullContent: document.querySelector(
//     '[data-modal-successfull-content]'
//   ),
//   errorSection: document.querySelector('[data-error-section]'),
//   galleryList: document.querySelector('.gallery-list'),
//   galleryTitle: document.querySelector('h1.gallery-title'),
//   paginationEl: document.querySelector('#tui-pagination-container'),
// };

// refs.userAreaEl.addEventListener('click', e => {
//   if (e.target.hasAttribute('data-logout-button')) {
//     logout();
//   }
//   if (e.target.hasAttribute('data-login-button')) {
//     login();
//   }
// });

// const firebaseConfig = {
//   apiKey: 'AIzaSyCTBJG-qoCxnqY0kLartne6JuIMgO3rCtI',
//   authDomain: 'exo-code.firebaseapp.com',
//   projectId: 'exo-code',
//   storageBucket: 'exo-code.appspot.com',
//   messagingSenderId: '1058079447675',
//   appId: '1:1058079447675:web:a8a6c524a829fb1f4160de',
//   databaseURL:
//     'https://exo-code-default-rtdb.europe-west1.firebasedatabase.app',
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getDatabase(app);

// auth.onAuthStateChanged(user => {
//   if (user) {
//     // User is signed in
//     const uid = user.uid;
//     const email = user.email;
//     const displayName = user.displayName;
//     const photoURL = user.photoURL;

//     const notAuthorizedEl = document.querySelector('[data-not-athorize]');
//     if (notAuthorizedEl) notAuthorizedEl.classList.add('visually-hidden');

//     refs.userAreaEl.innerHTML = getUserAreaPattern({
//       email: user.email,
//       authorized: true,
//     });

//     document
//       .querySelector('[data-logout-button]')
//       .addEventListener('click', () => {
//         logout();
//       });
//   } else {
//     refs.userAreaEl.innerHTML = getUserAreaPattern({});

//     if (
//       nomalizeURI === '/favorite-cocktails.html' ||
//       nomalizeURI === '/favorite-ingredients.html'
//     ) {
//       refs.galleryList.innerHTML = `
//         <div class="not-athorized" data-not-athorized>
//           You are not authorized
//           <button class="button-authorization user__button-big" type="button" data-login-btn>
//             Login
//           </button>
//         </div>
//       `;

//       const loginButton = document.querySelector('[data-login-btn]');

//       loginButton.addEventListener('click', e => {
//         login();
//       });
//     }
//   }
// });

// function hideNotAuthorizedMessage() {
//   const notAuthorizedEl = document.querySelector('[data-not-athorized]');
//   notAuthorizedEl.classList.add('visually-hidden');

//   if (
//     nomalizeURI === '/favorite-cocktails.html' ||
//     nomalizeURI === '/favorite-ingredients.html'
//   ) {
//     location.reload();
//   }
// }

// const nodeRef = ref(db, `favorites`);
// onValue(nodeRef, snapshot => {
//   const user = auth.currentUser;
//   const data = snapshot.val();
//   const markupData = [];

//   for (const uid in data) {
//     if (user.uid === uid) {
//       if (nomalizeURI === '/favorite-cocktails.html') {
//         const cocktails = data[uid].cocktails;
//         if (cocktails) {
//           for (const cocktailid in cocktails) {
//             const cocktailData = {
//               idDrink: cocktailid,
//               strDrinkThumb: cocktails[cocktailid].image,
//               strDrink: cocktails[cocktailid].title,
//             };

//             markupData.push(cocktailData);
//           }
//         }

//         if (!markupData) {
//           refs.galleryList.innerHTML = ``;
//           refs.galleryTitle.classList.add('visually-hidden');
//           refs.galleryList.classList.add('visually-hidden');
//           refs.errorSection.classList.remove('visually-hidden');
//           refs.paginationEl.classList.add('visually-hidden');
//           return;
//         }

//         refs.galleryList.innerHTML = `
//           <div class="gallery-loading">
//             <div data-loader="" class="loader-type1">
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//           </div>
//         `;

//         outputPagination(markupData);

//         const allButtons = document.querySelectorAll(
//           '[data-add-remove-favorite]'
//         );
//         allButtons.forEach(btn => {
//           if (btn.firstElementChild) {
//             btn.firstElementChild.textContent = 'Remove';
//             btn.setAttribute('data-action', 'delete');
//           }
//         });
//       }

//       if (nomalizeURI === '/favorite-ingredients.html') {
//         const ingredients = data[uid].ingredients;
//         if (ingredients) {
//           for (const ingredientid in ingredients) {
//             const ingredientData = {
//               id: ingredientid,
//               title: ingredients[ingredientid].title,
//               subtitle: ingredients[ingredientid].subtitle,
//             };

//             markupData.push(ingredientData);
//           }
//         }

//         if (!markupData) {
//           refs.galleryList.innerHTML = ``;
//           refs.galleryTitle.classList.add('visually-hidden');
//           refs.galleryList.classList.add('visually-hidden');
//           refs.errorSection.classList.remove('visually-hidden');
//           refs.paginationEl.classList.add('visually-hidden');
//           return;
//         }

//         refs.galleryList.innerHTML = `
//           <div class="gallery-loading">
//             <div data-loader="" class="loader-type1">
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//           </div>
//         `;

//         outputPaginationIngredients(markupData);
//       }
//     }
//   }
// });

// refs.joinBtn.addEventListener('click', function () {
//   refs.modalLoader.innerHTML = loaderPattern;
//   refs.modalLoader.classList.toggle('visually-hidden');

//   const email = refs.joinForm.elements.email.value;
//   const password = refs.joinForm.elements.password.value;

//   setTimeout(() => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(userCredential => {
//         const user = userCredential.user;
//         console.log('User account created:', user.uid);

//         if (nomalizeURI === '/' || nomalizeURI === '/index.html') {
//           refs.wellcomeEl.classList.toggle('visually-hidden');
//         }
//         refs.joinForm.classList.toggle('visually-hidden');
//         hideNotAuthorizedMessage();
//         location.reload();
//       })
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error('Error creating user account:', errorMessage);
//         console.error('errorCode:', errorCode);
//       })
//       .finally(refs.modalLoader.classList.toggle('visually-hidden'));
//   }, 500);
// });

// refs.loginBtn.addEventListener('click', function () {
//   refs.modalLoader.innerHTML = loaderPattern;
//   refs.modalLoader.classList.toggle('visually-hidden');

//   const email = refs.loginForm.elements.email.value;
//   const password = refs.loginForm.elements.password.value;

//   setTimeout(() => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then(userCredential => {
//         const user = userCredential.user;
//         console.log('User signed in:', user.uid);

//         if (nomalizeURI === '/' || nomalizeURI === '/index.html') {
//           refs.wellcomeEl.classList.toggle('visually-hidden');
//         }
//         refs.loginForm.classList.toggle('visually-hidden');
//         hideNotAuthorizedMessage();
//       })
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error('Error signing in:', errorMessage);
//       })
//       .finally(refs.modalLoader.classList.toggle('visually-hidden'));
//   }, 500);
// });

// () => {
//   onAuthStateChanged(auth, user => {
//     if (user) {
//       const uid = user.uid;
//     } else {
//       // User is signed out
//     }
//   });
// };

// function login() {
//   refs.joinForm.classList.add('visually-hidden');
//   refs.loginForm.classList.remove('visually-hidden');
//   refs.modalAuthentication.classList.toggle('is-hidden');
// }

// function logout() {
//   const loader = document.querySelector('.user [data-loader]');
//   loader.classList.remove('visually-hidden');
//   setTimeout(() => {
//     signOut(auth)
//       .then(() => {
//         refs.userAreaEl.innterHTML = getUserAreaPattern({});
//         loader.classList.add('visually-hidden');
//       })
//       .catch(error => {
//         console.error('Error signing out:', error);
//       });
//   }, 500);
// }

// async function updateDataInFirebase({
//   action,
//   elementImage,
//   elementType,
//   elementTitle,
//   elementSubtitle,
//   elementId,
//   targetElement,
// }) {
//   const user = auth.currentUser;

//   if (user) {
//     const taskRef = ref(
//       db,
//       `favorites/${user.uid}/${elementType}s/${elementId}`
//     );

//     try {
//       if (action === 'add') {
//         await set(taskRef, {
//           image: elementImage,
//           title: elementTitle,
//           subtitle: elementSubtitle || '',
//         });

//         refs.modalSuccessfullContent.innerHTML = getAddedMessagePattern({
//           type: elementType,
//           name: elementTitle,
//         });

//         if (targetElement.firstElementChild) {
//           targetElement.firstElementChild.innerHTML = 'Remove';
//         } else {
//           targetElement.innerHTML = 'Remove from favorite';
//         }

//         targetElement.setAttribute('data-action', 'delete');

//         const allFavBtns = document.querySelectorAll(
//           `[data-favorite-button-${elementId}]`
//         );
//         allFavBtns.forEach(btn => {
//           btn.setAttribute('data-action', 'delete');
//           btn.firstElementChild.textContent = 'Remove';
//         });

//         console.log('Data successfully written to Firestore!');
//       }

//       if (action === 'delete') {
//         await remove(taskRef);

//         refs.modalSuccessfullContent.innerHTML = getRemovedMessagePattern({
//           type: elementType,
//           name: elementTitle,
//         });

//         if (targetElement.firstElementChild) {
//           targetElement.firstElementChild.innerHTML = 'Add to';
//         } else {
//           targetElement.innerHTML = 'Add to favorite';
//         }
//         targetElement.setAttribute('data-action', 'add');

//         console.log('Data successfully removed from Firestore1!');
//       }
//     } catch (error) {
//       console.error('Error writing document: ', error);
//     }

//     refs.modalSuccessfull.classList.toggle('is-hidden');
//   } else {
//     refs.modalAuthentication.classList.toggle('is-hidden');
//   }
// }

// export { updateDataInFirebase, getFirebaseDataByUser };
