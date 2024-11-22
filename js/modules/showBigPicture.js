export function showBigPicture(photoData) {
  const bigPicture = document.querySelector('.big-picture');
  const bigImage = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');


  let commentsShown = 0; // Количество отображённых комментариев
  const COMMENTS_PER_PAGE = 5; // Количество комментариев, которые показываем за раз

  // Заполняем основные данные
  bigImage.src = photoData.url;
  bigImage.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  // Очищаем старые комментарии
  socialComments.innerHTML = '';

  // Функция для рендеринга части комментариев
  const renderComments = () => {
    const fragment = document.createDocumentFragment();
    const commentsToRender = photoData.comments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);

    commentsToRender.forEach(({ avatar, name, message }) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      commentElement.innerHTML = `
        <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
        <p class="social__text">${message}</p>
      `;

      fragment.appendChild(commentElement);
    });

    socialComments.appendChild(fragment);

    commentsShown += commentsToRender.length;

    // Обновляем счётчик комментариев
    commentCountBlock.textContent = `${commentsShown} из ${photoData.comments.length} комментариев`;

    // Скрываем кнопку, если все комментарии загружены
    if (commentsShown >= photoData.comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  // Изначально показываем первые комментарии
  renderComments();

  // Обработчик для кнопки «Загрузить ещё»
  const onLoadMoreComments = () => {
    renderComments();
  };

  commentsLoader.addEventListener('click', onLoadMoreComments);

  // Показываем блоки комментариев
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Показываем окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчик закрытия
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', onLoadMoreComments);
    document.removeEventListener('keydown', onEscPress);
  }


  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscPress);
}
