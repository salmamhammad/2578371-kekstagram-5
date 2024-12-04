
export function setupImagePreview() {
  const fileInput = document.querySelector('#upload-file');
  const previewImage = document.querySelector('.img-upload__preview img');
  const effectsPreviews = document.querySelectorAll('.effects__preview');
  const effectLevelElement = document.querySelector('#effect-level');

  function changeBackgroundImage(imageUrl) {
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${imageUrl}')`;
    });
  }
  fileInput.addEventListener('change', () => {
    document.querySelector('.effects__radio:checked').value = 'none';
    document.querySelector('.effect-level').classList.add('hidden');
    effectLevelElement.value = 100;

    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        changeBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);

    }
  });
}
