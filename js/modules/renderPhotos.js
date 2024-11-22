import { photoData } from './data.js';

export function renderPhotos() {
  const picturesContainer = document.querySelector('.pictures'); // Контейнер для фото
  const template = document.querySelector('#picture').content.querySelector('.picture'); // Шаблон

  const fragment = document.createDocumentFragment();

  photoData.forEach(({ url, description, likes, comments }) => {
    const element = template.cloneNode(true);

    const img = element.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    const likesElement = element.querySelector('.picture__likes');
    likesElement.textContent = `${likes} ❤`;

    const commentsElement = element.querySelector('.picture__comments');
    commentsElement.textContent = `${comments} 💬`;

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
}
