const refs = {
  modal: document.querySelector('[data-modal-authentication]'),
  joinModalBtn: document.querySelector('[data-modal-authentication-join]'),
  loginModalBtn: document.querySelector('[data-modal-authentication-login]'),
  loginForm: document.querySelector('[data-login-form]'),
  joinForm: document.querySelector('[data-join-form]'),
};

refs.joinModalBtn.addEventListener('click', () => {
  refs.loginForm.classList.toggle('visually-hidden');
  refs.joinForm.classList.toggle('visually-hidden');
});

refs.loginModalBtn.addEventListener('click', () => {
  refs.loginForm.classList.toggle('visually-hidden');
  refs.joinForm.classList.toggle('visually-hidden');
});
