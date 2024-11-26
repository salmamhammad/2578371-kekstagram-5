// Define possible comment messages
// import { renderPhotos } from './modules/renderPhotos.js';
import { applyFilter } from './modules/filters.js';


document.addEventListener('DOMContentLoaded', () => {
  applyFilter();
});

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Define possible commenter names
const names = [
  'Артём', 'Анна', 'Иван', 'Мария', 'Олег', 'Светлана', 'Елена', 'Владимир', 'Наталья', 'Дмитрий'
];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random comment
function generateComment(id) {
  return {
    id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages[getRandomInt(0, messages.length - 1)],
    name: names[getRandomInt(0, names.length - 1)]
  };
}

// Function to generate a photo description object
function generatePhotoObject(id) {
  // Generate unique comments for this photo
  const commentCount = getRandomInt(0, 30);
  const comments = Array.from({ length: commentCount }, (_, index) => generateComment(index + 1));

  return {
    id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages[getRandomInt(0, messages.length - 1)],
    name: names[getRandomInt(0, names.length - 1)],
    url: `photos/${id}.jpg`,
    description: `This is a description of photo ${id}`,
    likes: getRandomInt(15, 200),
    comments: comments
  };
}

// Generate an array of 25 unique photo description objects
const photos = Array.from({ length: 25 }, (_, index) => generatePhotoObject(index + 1));

// Export or log the photos array to use elsewhere in your project
console.log(photos);
