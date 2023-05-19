const documentBody = document.querySelector('.body');

// ГАМБУРГЕР
const hamburgerMenuBtn = document.querySelector('.hamburger');

// МОДАЛЬНЫЕ ОКНА
// Гамбургер-меню
const modalWindowHamburgerMenu = document.querySelector('.modal-window_type_hamburger-menu');
const hamburgerMenuWrapper = modalWindowHamburgerMenu.querySelector('.hamburger-menu-wrapper');

// Карточка
const modalWindowCard = document.querySelector('.modal-window_type_card');
const modalWindowCardName = modalWindowCard.querySelector('.section-heading');
const modalWindowCardImage = modalWindowCard.querySelector('.modal-window-img');
const modalWindowCardType = modalWindowCard.querySelector('.pet-type');
const modalWindowCardBreed = modalWindowCard.querySelector('.pet-breed');
const modalWindowCardDescription = modalWindowCard.querySelector('.section-description');
const modalWindowCardAge = modalWindowCard.querySelector('.pet-age');
const modalWindowCardInoculations = modalWindowCard.querySelector('.pet-inoculations');
const modalWindowCardDiseases = modalWindowCard.querySelector('.pet-diseases');
const modalWindowCardParasites = modalWindowCard.querySelector('.pet-parasites');

// КАРУСЕЛЬ
const templateCard = document.querySelector('.template-card').content;
const sectionOurFriends = document.querySelector('.our-friends__wrapper');
const carousel = sectionOurFriends.querySelector('.carousel');
const carouselTrack = carousel.querySelector('.carousel-track');
const carouselSlides = carousel.querySelectorAll('.carousel-slide');
// console.log(carouselSlides)
// let carouselSlideLeftCards = carouselTrack.querySelector('.carousel-slide-left');
// let carouselSlideActiveCards = carouselTrack.querySelector('.carousel-slide-active');
// let carouselSlideRightCards = carouselTrack.querySelector('.carousel-slide-right');
// console.log(carouselSlideLeftCards, carouselSlideActiveCards, carouselSlideRightCards)
const carouselBtnNext = sectionOurFriends.querySelector('.btn-slider_direction_next');
const carouselBtnPrev = sectionOurFriends.querySelector('.btn-slider_direction_prev');
