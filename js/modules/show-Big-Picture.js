export function showBigPicture(photoData) {
  const bigPicture = document.querySelector('.big-picture');
  const bigImage = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  let commentsShown = 0; // Number of displayed comments
  const COMMENTS_PER_PAGE = 5; // Number of comments we show at a time

  // Fill in the  data
  bigImage.src = photoData.url;
  bigImage.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  socialCaption.textContent = photoData.description;

  // Cleaning up old comments
  socialComments.innerHTML = '';

  // Function for rendering part of comments
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

    //  Updating the comment counter
    commentCountBlock.textContent = `${commentsShown} из ${photoData.comments.length} комментариев`;

    // Hide button if all comments are loaded
    if (commentsShown >= photoData.comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  // Initially showing the first comments
  renderComments();

  // Handler for the "Load More" button
  const onLoadMoreComments = () => {
    renderComments();
  };

  commentsLoader.addEventListener('click', onLoadMoreComments);

  // Showing comment blocks
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Showing the window
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Add a close handler
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
