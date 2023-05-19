// ФУНКЦИИ
// ОБЩЕЕ
function checkWindowWidth() {
  let windowWidth;

  windowWidth = window.innerWidth;
  return windowWidth;
}

// КАРТОЧКИ
function createTemplateCard(card) {
  const { id, name, img } = card;

  const cardItem = templateCard.cloneNode(true);

  const cardContent = cardItem.querySelector('.card-friend');
  const cardName = cardContent.querySelector('.card-title');
  const cardImage = cardContent.querySelector('.card-friend__img');

  cardContent.id = id;
  cardName.textContent = name;
  cardImage.src = img;
  cardImage.alt = `A pet of shelter 'Cozy House': ${name}`;

  return cardItem;
}

function shuffleCards(arr) {
  const cards = [...arr];

  // Тасование Фишера—Йетса
  for (let i = 0; i < cards.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function insertCardsInSlides() {
  let windowWidth = checkWindowWidth();

  const arrCardsGeneralRandom = shuffleCards(initialCards);

  let arrCardsLeft = [];
  let arrCardsActive = [];
  let arrCardsRight = [];

  if (windowWidth >= 1280) {
    function putCardsInArr(arr) {
      for (let i = 0; i < 3; i++) {
        arr.push(arrCardsGeneralRandom.splice(0, 1));
      }
    }
  }

  if (windowWidth >= 768 && windowWidth <= 1279) {
    function putCardsInArr(arr) {
      for (let i = 0; i < 2; i++) {
        arr.push(arrCardsGeneralRandom.splice(0, 1));
      }
    }
  }

  if (windowWidth >= 320 && windowWidth <= 767) {
    function putCardsInArr(arr) {
      arr.push(arrCardsGeneralRandom.splice(0, 1));
    }
  }

  putCardsInArr(arrCardsLeft);
  putCardsInArr(arrCardsActive);
  putCardsInArr(arrCardsRight);

  arrCardsLeft = arrCardsLeft.flat();
  arrCardsActive = arrCardsActive.flat();

  arrCardsRight = arrCardsRight.flat();

  if (windowWidth >= 1280) {
    arrCardsRight.push(arrCardsLeft[Math.floor(Math.random() * 3)]);
  }

  carouselSlides[0].innerHTML = '';
  carouselSlides[1].innerHTML = '';
  carouselSlides[2].innerHTML = '';

  function insertCardInSlide(arr, indx) {
    arr.forEach((card) => {
      carouselSlides[indx].append(createTemplateCard(card));
    })
  }

  insertCardInSlide(arrCardsLeft, 0);
  insertCardInSlide(arrCardsActive, 1);
  insertCardInSlide(arrCardsRight, 2);
}

function handleCardDataInModalWindow(pet) {
  modalWindowCardName.textContent = pet?.name || '-';
  modalWindowCardImage.src = pet?.img || '#';
  modalWindowCardImage.alt = pet ? `Just look at this cutie: a ${pet?.type.toLowerCase()}, whose name is ${pet?.name}` : '#';
  modalWindowCardType.textContent = pet?.type || '-';
  modalWindowCardBreed.textContent = pet?.breed || '-';
  modalWindowCardDescription.textContent = pet?.description || '-';
  modalWindowCardAge.textContent = pet?.age || '-';
  modalWindowCardInoculations.textContent = pet?.inoculations || '-';
  modalWindowCardDiseases.textContent = pet?.diseases || '-';
  modalWindowCardParasites.textContent = pet?.parasites || '-';
}

function insertCardDataIntoModalWindow(evt) {
  const { target } = evt;

  if (target.closest('.card-friend')) {
    const id = target.closest('.card-friend').id;
    const pet = initialCards[id - 1];

    handleCardDataInModalWindow(pet);
    openModalWindow(modalWindowCard);
  }
}

// МОДАЛЬНЫЕ ОКНА
function openModalWindow(modal) {
  modal.classList.add('modal-window_opened');
  documentBody.classList.add('body_opened');
  document.addEventListener('keydown', handleEscape);
}

function closeModalWindow(modal) {
  modal.classList.remove('modal-window_opened');
  documentBody.classList.remove('body_opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const modalWindowOpened = document.querySelector('.modal-window_opened');
    closeModalWindow(modalWindowOpened);
  }
}

function closeModalWindowCard(evt) {
  const { target } = evt;

  if (target.classList.contains('modal-window_opened')
    || target.classList.contains('btn-icon_type_close')) {
    closeModalWindow(modalWindowCard);
    setTimeout(handleCardDataInModalWindow, 300);
  }
}

function handleHamburgerMenu() {
  hamburgerMenuBtn.classList.toggle('hamburger_opened');

  modalWindowHamburgerMenu.classList.toggle('modal-window_opened');
  hamburgerMenuWrapper.classList.toggle('hamburger-menu-wrapper_opened');

  documentBody.classList.toggle('body_opened');
}

function closeModalWindowHamburgerMenu(evt) {
  const { target } = evt;

  if (target.classList.contains('modal-window_opened')
    || target.classList.contains('nav__link')) {
    handleHamburgerMenu();
  }
}

// КАРУСЕЛЬ
let carouselCounter = 0;

function changeCards(counter) {
  if (carouselCounter === counter) {
    insertCardsInSlides();

    carouselCounter = 0;
  }
}

function moveCarouselLeft() {
  carouselCounter--;

  changeCards(-2);

  carouselTrack.classList.add('carousel-transition-left');

  carouselBtnPrev.removeEventListener('click', moveCarouselLeft);
  carouselBtnNext.removeEventListener('click', moveCarouselRight);
}

function moveCarouselRight() {
  carouselCounter++;

  changeCards(2);

  carouselTrack.classList.add('carousel-transition-right');

  carouselBtnPrev.removeEventListener('click', moveCarouselLeft);
  carouselBtnNext.removeEventListener('click', moveCarouselRight);
}

// ОБРАБОТЧИКИ СОБЫТИЙ
// ДОКУМЕНТ
document.addEventListener('DOMContentLoaded', insertCardsInSlides);
window.addEventListener('resize', checkWindowWidth);

// МОДАЛЬНЫЕ ОКНА
hamburgerMenuBtn.addEventListener('click', handleHamburgerMenu);
modalWindowHamburgerMenu.addEventListener('mousedown', closeModalWindowHamburgerMenu);

carouselTrack.addEventListener('click', insertCardDataIntoModalWindow);

modalWindowCard.addEventListener('mousedown', closeModalWindowCard);

// КАРУСЕЛЬ
carouselBtnPrev.addEventListener('click', moveCarouselLeft);
carouselBtnNext.addEventListener('click', moveCarouselRight);

carouselTrack.addEventListener('animationend', (animation) => {
  if (animation.animationName === 'transition-left') {
    carouselTrack.classList.remove('carousel-transition-left');

    const leftItems = document.querySelector('.carousel-slide-left').innerHTML;
    const activeItems = document.querySelector('.carousel-slide-active').innerHTML;
    const rightItems = document.querySelector('.carousel-slide-right').innerHTML;

    document.querySelector('.carousel-slide-active').innerHTML = leftItems;
    document.querySelector('.carousel-slide-left').innerHTML = rightItems;
    document.querySelector('.carousel-slide-right').innerHTML = activeItems;
  } else {
    carouselTrack.classList.remove('carousel-transition-right');

    const leftItems = document.querySelector('.carousel-slide-left').innerHTML;
    const activeItems = document.querySelector('.carousel-slide-active').innerHTML;
    const rightItems = document.querySelector('.carousel-slide-right').innerHTML;

    document.querySelector('.carousel-slide-active').innerHTML = rightItems;
    document.querySelector('.carousel-slide-left').innerHTML = activeItems;
    document.querySelector('.carousel-slide-right').innerHTML = leftItems;
  }

  carouselBtnPrev.addEventListener('click', moveCarouselLeft);
  carouselBtnNext.addEventListener('click', moveCarouselRight);
})
