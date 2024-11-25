const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram'; // Replace with actual server URL

/**
 * Fetch photos from the server.
 * @returns {Promise<Array>} Resolves to an array of photo data or rejects with an error.
 */
export async function fetchPhotos() {
  function showErrorMessage() {
    const template = document.querySelector('#fetcherror').content;
    const errorMessage = template.cloneNode(true);
    document.body.appendChild(errorMessage);

    const errorElement = document.querySelector('.fetcherror');
    const errorButton = errorElement.querySelector('.fetcherror__button');

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
      if (!event.target.closest('.fetcherror__inner')) { // Corrected class selector
        removeErrorMessage();
      }
    }
    document.addEventListener('click', onOutsideClick);
  }

  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      showErrorMessage(); // Show the error message if the response is not ok
      throw new Error(`Failed to fetch photos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    showErrorMessage(); // Show the error message if there's a network error
    throw error;
  }
}



export async function sendFormDataWithXHR(formData) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}`);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Data sent successfully:', xhr.responseText);
    } else {
      console.error(`Error sending form data: ${xhr.status} ${xhr.statusText}`);
    }
  };

  xhr.onerror = function () {
    console.error('Network error occurred.');
  };

  xhr.send(formData);
}
