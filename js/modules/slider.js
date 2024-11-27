
const initSlider = (sliderElement, valueElement, onChange) => {
  noUiSlider.create(sliderElement, {
    start: 100,
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', (values) => {
    const value = Math.round(values[0]);
    valueElement.value = value;
    onChange(value);
  });

  return sliderElement.noUiSlider;
};

const resetSlider = (sliderInstance, valueElement) => {
  sliderInstance.set(100);
  valueElement.value = 100;
};

export { initSlider, resetSlider };
