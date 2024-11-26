import { sendFormDataWithXHR } from './api.js';

export function setupForm() {
  const form = document.querySelector('#upload-select-image');
  const cancelBtn = document.querySelector('#upload-cancel');
  const fileInput = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const scaleValue = document.querySelector('#scale-value');
  const effectNone = document.querySelector('#effect-none');
  const hashtagsField = document.querySelector('.text__hashtags');
  const descriptionField = document.querySelector('.text__description');
  const submitButton = document.querySelector('#upload-submit');
  // Function to show the success message
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
  // Function to show the error message
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
      errorElement.removeEventListener('click', onOutsideClick);

      // Reset form inputs after error
      resetForm();
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
      if (!event.target.closest('.error__inner')) {
        removeErrorMessage();
      }
    }
    errorElement.addEventListener('click', onOutsideClick);
  }

  // Function to reset form to initial state
  function resetForm() {
    form.reset();
    // Close the form overlay
    uploadOverlay.classList.add('hidden');

    // Reset the scale to 100%
    scaleValue.value = '100%';

    // Reset effects to "Original"
    effectNone.checked = true;

    // Clear hashtags and comments fields
    hashtagsField.value = '';
    descriptionField.value = '';

    // Clear the file input
    fileInput.value = '';

    // Reset styles or additional logic here if needed
    const previewImage = document.querySelector('.img-upload__preview img');
    if (previewImage) {
      previewImage.style.transform = 'scale(1)';
      previewImage.style.filter = 'none';
    }
  }
  // Reset form and clear file input when closed
  cancelBtn.addEventListener('click', () => {

    fileInput.value = '';
    hideFormOverlay();
    resetForm();
  });

  // Show form overlay
  fileInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  // Hide form overlay
  function hideFormOverlay() {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function disableSubmitButton() {
    submitButton.disabled = true;
    submitButton.textContent = 'Uploading...'; // Update button text to show progress
  }

  function enableSubmitButton() {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit'; // Reset button text
  }

  // Form submission handler
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    disableSubmitButton();
    try {
      await sendFormDataWithXHR(formData);
      hideFormOverlay();

      showSuccessMessage();
      resetForm();
      // Remove success message after a delay
      setTimeout(() => {
        // document.body.removeChild(successMessage);
      }, 10000);
    } catch (error) {
      showErrorMessage();
      console.error('Error submitting form:', error);


    } finally {
      enableSubmitButton(); // Re-enable the submit button
    }
  });
}

