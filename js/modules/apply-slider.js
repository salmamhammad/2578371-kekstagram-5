import { initSlider, resetSlider } from './slider.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
export function applyslider() {
  const sliderElement = document.querySelector('#effect-slider');
  const effectLevelElement = document.querySelector('#effect-level');
  const imageElement = document.querySelector('.img-upload__preview img');
  const scaleSmaller = document.querySelector('#scale-smaller');
  const scaleBigger = document.querySelector('#scale-bigger');
  const scaleValueElement = document.querySelector('#scale-value');
  const effectButtons = document.querySelectorAll('.effects__radio');

  const sliderInstance = initSlider(sliderElement, effectLevelElement, (value) => {
    const selectedEffect = document.querySelector('.effects__radio:checked').value;
    imageElement.style.filter = selectedEffect === 'none' ? '' : `filter(${value}%)`;
  });


  initScale(scaleSmaller, scaleBigger, scaleValueElement, imageElement);
  initEffects(effectButtons, imageElement, sliderInstance, () => resetSlider(sliderInstance, effectLevelElement));


}
