const documentBody = document.querySelector('.body');

// ГАМБУРГЕР
const hamburgerMenuBtn = document.querySelector('.hamburger');
const hamburgerMenuBtnLines = hamburgerMenuBtn.querySelectorAll('.hamburger__line_theme_dark');

// СЛАЙДЕР
const friendsWrapper = document.querySelector('.our-friends__wrapper-2');

const slider = friendsWrapper.querySelector('.slider');
const sliderStep = friendsWrapper.querySelector('.our-friends__slider-counter');

const sliderBtnStart = friendsWrapper.querySelector('.our-friends__slider-btn-start');
const sliderBtnPrev = friendsWrapper.querySelector('.our-friends__slider-btn-prev');
const sliderBtnNext = friendsWrapper.querySelector('.our-friends__slider-btn-next');
const sliderBtnEnd = friendsWrapper.querySelector('.our-friends__slider-btn-end');

// Карточка
const templateCard = document.querySelector('.template-card').content;

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

// МОДАЛЬНЫЕ ОКНА
// Гамбургер-меню
const modalWindowHamburgerMenu = document.querySelector('.modal-window_type_hamburger-menu');
const hamburgerMenuWrapper = modalWindowHamburgerMenu.querySelector('.hamburger-menu-wrapper');
