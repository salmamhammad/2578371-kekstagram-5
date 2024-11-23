const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const initScale = (scaleSmaller, scaleBigger, scaleValueElement, imageElement) => {
  const updateScale = (newScale) => {
    scaleValueElement.value = `${newScale}%`;
    imageElement.style.transform = `scale(${newScale / 100})`;
  };

  const onScaleSmallerClick = () => {
    const currentScale = parseInt(scaleValueElement.value, 10);
    const newScale = Math.max(SCALE_MIN, currentScale - SCALE_STEP);
    updateScale(newScale);
  };

  const onScaleBiggerClick = () => {
    const currentScale = parseInt(scaleValueElement.value, 10);
    const newScale = Math.min(SCALE_MAX, currentScale + SCALE_STEP);
    updateScale(newScale);
  };

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
};

export { initScale };
