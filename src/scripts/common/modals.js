const refs = {
  modals: document.querySelectorAll('.modal'),
};

refs.modals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (
      !e.target.hasAttribute('data-modal-close') &&
      !e.target.hasAttribute('data-modal')
    )
      return;

    modal.classList.toggle('is-hidden');
  });
});
