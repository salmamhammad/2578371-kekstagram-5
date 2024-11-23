const EFFECTS = {
  none: '',
  chrome: 'grayscale(1)',
  sepia: 'sepia(1)',
  marvin: 'invert(100%)',
  phobos: 'blur(3px)',
  heat: 'brightness(3)',
};

const initEffects = (effectButtons, imageElement, sliderInstance, resetSlider) => {
  const applyEffect = (effect) => {
    imageElement.style.filter = EFFECTS[effect] || '';
  };

  effectButtons.forEach((button) => {
    button.addEventListener('change', (event) => {
      const effect = event.target.value;
      applyEffect(effect);
      resetSlider(sliderInstance);
    });
  });
};


export { initEffects };
