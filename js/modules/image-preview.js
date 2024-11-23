export function setupImagePreview() {
  const fileInput = document.querySelector('#upload-file');
  const previewImage = document.querySelector('.img-upload__preview img');

  fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              previewImage.src = e.target.result; // Set preview image source
          };
          reader.readAsDataURL(file);
      }
  });
}
