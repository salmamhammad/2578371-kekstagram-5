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

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(form);
    const jsonData = {};

    // Convert FormData to JSON
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Open a new page
    const newWindow = window.open('', '_blank');

    // Write JSON data to the new page
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Form Data</title>
          </head>
          <body>
            <pre>${JSON.stringify(jsonData, null, 2)}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      alert('Pop-up blocked! Please allow pop-ups for this website.');
    }
  });
}
