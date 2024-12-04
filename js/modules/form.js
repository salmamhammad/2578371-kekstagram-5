import { sendFormData } from './api.js';
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
  const hashtagsInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  });
  // Hashtags validation
  pristine.addValidator(
    hashtagsInput,
    (value) => {
      if (!value.trim()){
        return true;
      }// Empty input is valid
      const hashtags = value.split(/\s+/).filter(Boolean);
      return hashtags.length <= 5 &&
             hashtags.every((tag) => /^#[a-zA-Z0-9]{1,19}$/.test(tag)) &&
             new Set(hashtags.map((tag) => tag.toLowerCase())).size === hashtags.length;
    },
    'Invalid hashtags: up to 5, unique, start with #, max length 20.'
  );

  // Comment validation
  pristine.addValidator(
    commentInput,
    (value) => value.length <= 140,
    'Comment must be 140 characters or less.'
  );

  function checkValidationOnChange() {
    // Validate all fields
    const isValid = pristine.validate();
    if (isValid) {
      enableSubmitButton();
    } else {
      disableSubmitButton();
    }
  }
  hashtagsInput.addEventListener('input', checkValidationOnChange);
  commentInput.addEventListener('input', checkValidationOnChange);
  // Function to show the success message


  // Function to reset form to initial state
  function resetForm() {
    form.reset();
    // Close the form overlay
    uploadOverlay.classList.add('hidden');

    // Reset the scale and effects
    scaleValue.value = '100%';

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
  function onEscKeyPress(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      hideFormOverlay();
    }
  }
  document.addEventListener('keydown', onEscKeyPress);
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
    // document.removeEventListener('keydown', onEscKeyPress);
  }

  function disableSubmitButton() {
    submitButton.disabled = true;
  }

  function enableSubmitButton() {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }

  // Form submission handler
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!pristine.validate()) {
      disableSubmitButton();
      return;
    }
    disableSubmitButton();
    const formData = new FormData(form);

    try {
      const response = await sendFormData(formData);
      // console.log( response);
      if (response.ok) {
        hideFormOverlay();
        resetForm();
      }
      // Remove success message after a delay

    } catch (error) {

      // console.error('Error submitting form:', error);


    } finally {
      enableSubmitButton(); // Re-enable the submit button
    }
  });
}

