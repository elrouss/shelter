// ФУНКЦИИ
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

// СЛАЙДЕР
let sliderCounter = 0;

function createSlider(arr) {
  const originArr = [...arr];
  const newArr = [];

  for (let i = 0; i < 6; i++) {
    const random = shuffleCards(originArr);

    newArr.push(random);
  }

  for (let i = 0; i < 6; i++) {
    const slide = document.createElement('div');
    slide.className = 'slide';

    slider.append(slide);
  }

  const slides = slider.querySelectorAll('.slide');

  for (let i = 0; i < slides.length; i++) {
    newArr[i].forEach((card) => {
      slides[i].append(createTemplateCard(card));
    })
  }

  slides[sliderCounter].classList.add('slide_visible');
}

function handleSliderForward() {
  const slides = slider.querySelectorAll('.slide');

  if (sliderCounter === slides.length - 1) {
    return;
  }

  slides[sliderCounter].classList.remove('slide_visible');

  sliderCounter++;
  sliderStep.textContent = sliderCounter + 1;

  if (sliderCounter > 0) {
    sliderBtnPrev.disabled = false;
    sliderBtnStart.disabled = false;
  }

  slides[sliderCounter].classList.add('slide_visible');

  if (sliderCounter === slides.length - 1) {
    sliderBtnNext.disabled = true;
    sliderBtnEnd.disabled = true;
  } else {
    sliderBtnNext.disabled = false;
  }
}

function handleSliderToEnd() {
  const slides = slider.querySelectorAll('.slide');

  if (sliderCounter === slides.length - 1) {
    return;
  }

  slides[sliderCounter].classList.remove('slide_visible');

  sliderCounter = slides.length - 1;
  sliderStep.textContent = sliderCounter + 1;

  if (sliderCounter > 0) {
    sliderBtnPrev.disabled = false;
    sliderBtnStart.disabled = false;
  }

  slides[sliderCounter].classList.add('slide_visible');

  if (sliderCounter === slides.length - 1) {
    sliderBtnNext.disabled = true;
    sliderBtnEnd.disabled = true;
  } else {
    sliderBtnNext.disabled = false;
    sliderBtnEnd.disabled = false;
  }
}

function handleSliderBackward() {
  const slides = slider.querySelectorAll('.slide');

  if (sliderCounter === 0) {
    return;
  } else {
    sliderBtnPrev.disabled = false;
    sliderBtnStart.disabled = false;
  }

  slides[sliderCounter].classList.remove('slide_visible');

  sliderCounter--;
  sliderStep.textContent = sliderCounter + 1;

  if (sliderCounter <= slides.length - 1) {
    sliderBtnNext.disabled = false;
    sliderBtnEnd.disabled = false;
  }

  slides[sliderCounter].classList.add('slide_visible');

  if (sliderCounter === 0) {
    sliderBtnPrev.disabled = true;
    sliderBtnStart.disabled = true;
  } else {
    sliderBtnPrev.disabled = false;
    sliderBtnStart.disabled = false;
  }
}

function handleSliderToStart() {
  const slides = slider.querySelectorAll('.slide');

  if (sliderCounter === 0) {
    return;
  } else {
    sliderBtnPrev.disabled = false;
  }

  slides[sliderCounter].classList.remove('slide_visible');

  sliderCounter = 0;
  sliderStep.textContent = sliderCounter + 1;

  if (sliderCounter <= slides.length - 1) {
    sliderBtnNext.disabled = false;
    sliderBtnEnd.disabled = false;
  }

  slides[sliderCounter].classList.add('slide_visible');

  if (sliderCounter === 0) {
    sliderBtnPrev.disabled = true;
    sliderBtnStart.disabled = true;
  } else {
    sliderBtnPrev.disabled = false;
    sliderBtnStart.disabled = false;
  }
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

  for (let hamburgerMenuBtnLine of hamburgerMenuBtnLines) {
    hamburgerMenuBtnLine.classList.toggle('hamburger__line_theme_dark-opened');
  }

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

// ОБРАБОТЧИКИ СОБЫТИЙ
// ОБЩЕЕ
document.addEventListener('DOMContentLoaded', createSlider(initialCards));

// МОДАЛЬНЫЕ ОКНА
hamburgerMenuBtn.addEventListener('click', handleHamburgerMenu);
modalWindowHamburgerMenu.addEventListener('mousedown', closeModalWindowHamburgerMenu);

slider.addEventListener('click', insertCardDataIntoModalWindow);

modalWindowCard.addEventListener('mousedown', closeModalWindowCard);

// СЛАЙДЕР
// TODO: Удалять обработчики на дизейбленных кнопках
sliderBtnNext.addEventListener('click', handleSliderForward);
sliderBtnEnd.addEventListener('click', handleSliderToEnd);

sliderBtnPrev.addEventListener('click', handleSliderBackward);
sliderBtnStart.addEventListener('click', handleSliderToStart);
