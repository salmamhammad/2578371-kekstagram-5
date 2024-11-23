export function setupForm() {
  const form = document.querySelector('#upload-select-image');
  const cancelBtn = document.querySelector('#upload-cancel');
  const fileInput = document.querySelector('#upload-file');

  // Reset form and clear file input when closed
  cancelBtn.addEventListener('click', () => {
      form.reset(); // Reset all form fields
      fileInput.value = ''; // Clear file input
      hideFormOverlay(); // Hide overlay
  });

  // Show form overlay
  fileInput.addEventListener('change', () => {
      const overlay = document.querySelector('.img-upload__overlay');
      overlay.classList.remove('hidden');
  });

  // Hide form overlay
  function hideFormOverlay() {
      const overlay = document.querySelector('.img-upload__overlay');
      overlay.classList.add('hidden');
  }
}
