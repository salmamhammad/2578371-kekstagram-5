import { initPhotos, renderPhotos } from './render-Photos.js';
import { debounce } from './debounce.js';

const DEFAULT_FILTER_ID = 'filter-default';
const RANDOM_FILTER_ID = 'filter-random';
const DISCUSSED_FILTER_ID = 'filter-discussed';

const imgFiltersContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');


function filterImages(photos, filterId) {
  let filteredPhotos = [];

  switch (filterId) {
    case DEFAULT_FILTER_ID:
      filteredPhotos = photos;
      break;

    case RANDOM_FILTER_ID:
      filteredPhotos = photos
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      break;

    case DISCUSSED_FILTER_ID:
      filteredPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;

    default:
      filteredPhotos = photos;
  }

  renderPhotos(filteredPhotos);
}
export async function applyFilter() {
  const photos = await initPhotos(); // Fetch and render default photos

  // Show filter controls once photos are loaded
  imgFiltersContainer.classList.remove('img-filters--inactive');

  // Debounce the filter application
  const debouncedApplyFilter = debounce((filterId) => {
    filterImages(photos, filterId);
  }, 500);

  // Set up filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      button.classList.add('img-filters__button--active');

      const filterId = button.id;
      debouncedApplyFilter(filterId); // Apply selected filter with debounce
    });
  });
}
