import { fetchPhotos } from './api.js';
import { showBigPicture } from './show-Big-Picture.js';
import { setupForm } from './form.js';
import { setupImagePreview } from './image-preview.js';
import { applyslider } from './apply-slider.js';

export async function renderPhotos(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const imgUpload = document.querySelector('#img-upload').content.querySelector('.img-upload');
  const fragmentImgUpload = imgUpload.cloneNode(true);
  const fragment = document.createDocumentFragment();

  picturesContainer.innerHTML = '';

  picturesContainer.appendChild(fragmentImgUpload);
  setupForm();
  setupImagePreview();
  applyslider();

  photos.forEach((photo) => {
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
export async function initPhotos() {
  const picturesContainer = document.querySelector('.pictures');

  const imgUpload = document.querySelector('#img-upload').content.querySelector('.img-upload');
  const fragmentImgUpload = imgUpload.cloneNode(true);
  picturesContainer.innerHTML = '';

  picturesContainer.appendChild(fragmentImgUpload);
  try {
    const photos = await fetchPhotos();
    renderPhotos(photos); // Render photos initially without any filtering
    return photos; // Return the photos for filter application
  } catch (error) {
    // console.error('Error initializing photos:', error);
  }
}
