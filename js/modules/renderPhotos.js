import { photoData } from './data.js';
import { showBigPicture } from './showBigPicture.js';

export function renderPhotos() {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  photoData.forEach((photo) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;

    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
}
