const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export async function fetchPhotos() {

  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      showErrorMessage();
      throw new Error(`Failed to fetch photos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    showTopBar('Не удалось получить изображения с сервера');
    throw error;
  }
}
// Function to show the top bar with a custom message
function showTopBar(message) {
  const topBar = document.querySelector('.top-bar');
  const messageElement = document.querySelector('.top-bar__message');
  messageElement.textContent = message || 'An error occurred. Please try again.';
  topBar.classList.remove('hidden');
  topBar.style.display = 'block';
  const imgFilters = document.querySelector('.img-filters ');
  imgFilters.classList.add('hidden');
  // Automatically hide the top bar after 5 seconds
  setTimeout(() => {
    hideTopBar();
  }, 5000);
}

// Function to hide the top bar
function hideTopBar() {
  const topBar = document.getElementById('top-bar');
  topBar.classList.add('hidden');
  topBar.style.display = 'none';
}

function showSuccessMessage() {
  const template = document.querySelector('#success').content;
  const successMessage = template.cloneNode(true);
  document.body.appendChild(successMessage);

  const successElement = document.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');

  // Function to remove the success message
  function removeSuccessMessage() {
    successElement.remove();

    // Remove event listeners after the message is removed
    document.removeEventListener('keydown', onEscKeyPress);
    successElement.removeEventListener('click', onOutsideClick);
  }

  // Close message on button click
  successButton.addEventListener('click', () => {
    removeSuccessMessage();
  });

  // Close message on pressing Esc
  function onEscKeyPress(event) {
    if (event.key === 'Escape') {
      removeSuccessMessage();
    }
  }
  document.addEventListener('keydown', onEscKeyPress);

  // Close message on clicking outside the message box
  function onOutsideClick(event) {
    if (!event.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  }
  successElement.addEventListener('click', onOutsideClick);
}
function showErrorMessage() {
  const template = document.querySelector('#error').content;
  const errorMessage = template.cloneNode(true);
  document.body.appendChild(errorMessage);

  const errorElement = document.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');

  // Function to remove the error message
  function removeErrorMessage() {
    errorElement.remove();

    // Remove event listeners after the message is removed
    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('click', onOutsideClick);
  }

  // Close message on button click
  errorButton.addEventListener('click', () => {
    removeErrorMessage();
  });

  // Close message on pressing Esc
  function onEscKeyPress(event) {
    if (event.key === 'Escape') {
      removeErrorMessage();
    }
  }
  document.addEventListener('keydown', onEscKeyPress);

  // Close message on clicking outside the message box
  function onOutsideClick(event) {
    if (!event.target.closest('.fetcherror__inner')) {
      removeErrorMessage();
    }
  }
  document.addEventListener('click', onOutsideClick);
}

export async function sendFormData(formData) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      // showErrorMessage(); // Show the error message if the response is not ok
      throw new Error(`'Data sent successfully: ${response.status}`);
    }else{
      showSuccessMessage();
    }
    return await response;
  } catch (error) {
    showErrorMessage();
    throw error;
  }
}
