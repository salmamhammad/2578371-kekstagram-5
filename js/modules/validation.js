export function setupValidation() {
  const form = document.querySelector('#upload-select-image');
  const pristine = new Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'form__error'
  });

  const hashtagsInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');

  // Hashtags validation
  pristine.addValidator(
      hashtagsInput,
      (value) => {
          if (!value.trim()) return true; // Empty input is valid
          const hashtags = value.split(/\s+/).filter(Boolean);
          return hashtags.length <= 5 &&
                 hashtags.every(tag => /^#[a-zA-Z0-9]{1,19}$/.test(tag)) &&
                 new Set(hashtags.map(tag => tag.toLowerCase())).size === hashtags.length;
      },
      'Invalid hashtags: up to 5, unique, start with #, max length 20.'
  );

  // Comment validation
  pristine.addValidator(
      commentInput,
      (value) => value.length <= 140,
      'Comment must be 140 characters or less.'
  );

  // Handle form submission
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (pristine.validate()) {
          form.submit(); // Submit the form if valid
      }
  });
}
