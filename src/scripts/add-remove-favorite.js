import { updateDataInFirebase } from './firebase';

const refs = {
  addRemoveFavoriteBtns: document.querySelectorAll(
    '[data-add-remove-favorite]'
  ),
};

document.body.addEventListener('click', e => {
  let targetElement;

  if (e.target.hasAttribute('data-add-remove-favorite')) {
    targetElement = e.target;
  }
  if (
    e.target.parentElement &&
    e.target.parentElement.hasAttribute('data-add-remove-favorite')
  ) {
    targetElement = e.target.parentElement;
  }
  if (
    e.target.parentElement &&
    e.target.parentElement.parentElement &&
    e.target.parentElement.parentElement.hasAttribute(
      'data-add-remove-favorite'
    )
  ) {
    targetElement = e.target.parentElement.parentElement;
  }

  if (!targetElement) return;

  addRemoveFavorite(targetElement);
});

const addRemoveFavorite = targetElement => {
  const action = targetElement.getAttribute('data-action') || 'add';
  const elementType = targetElement.getAttribute('data-element-type') || '';
  const elementImage = targetElement.getAttribute('data-element-image') || '';
  const elementTitle = targetElement.getAttribute('data-element-title') || '';
  const elementSubtitle =
    targetElement.getAttribute('data-element-subtitle') || '';
  const elementId = targetElement.getAttribute('data-element-id') || '';

  const data = {
    action: action,
    elementImage,
    elementType,
    elementTitle,
    elementSubtitle,
    elementId,
    targetElement,
  };

  updateDataInFirebase(data);
};
