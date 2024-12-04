const EFFECTS = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

const EFFECT_RANGES = {
  none: { min: 0, max: 0, step: 0 },
  chrome: { min: 0, max: 1, step: 0.1 },
  sepia: { min: 0, max: 1, step: 0.1 },
  marvin: { min: 0, max: 100, step: 1 },
  phobos: { min: 0, max: 3, step: 0.1 },
  heat: { min: 1, max: 3, step: 0.1 },
};

const initEffects = (effectButtons, imageElement, sliderInstance, resetSlider) => {

  const applyEffect = (effect, value) => {
    const effectProperty = EFFECTS[effect];
    if (effectProperty) {
      let unit = '';
      if (effect === 'phobos') {
        unit = 'px';
      } else if (effect === 'marvin') {
        unit = '%';
      }
      // const unit = effect === 'phobos' ? 'px' : effect === 'marvin' ? '%' : '';
      imageElement.style.filter = `${effectProperty}(${value}${unit})`;
    } else {
      imageElement.style.filter = ''; // Reset filter if no effect
    }
  };

  effectButtons.forEach((button) => {
    button.addEventListener('change', (event) => {
      const effect = event.target.value;
      resetSlider(sliderInstance);
      if (effect === 'none') {
        document.querySelector('.effect-level').classList.add('hidden');
        applyEffect(effect, 0);

      } else {
        document.querySelector('.effect-level').classList.remove('hidden');

        // Update slider configuration for the selected effect
        const { min, max, step } = EFFECT_RANGES[effect];
        sliderInstance.updateOptions({
          range: { min, max },
          start: max, // Start at the maximum effect level
          step,
        });

        sliderInstance.on('update', (values) => {
          const value = values[0];
          document.querySelector('#effect-level').value = value;
          applyEffect(effect, value);
        });
      }
    });
  });
};

export { initEffects };
