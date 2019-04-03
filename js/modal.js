// ------------------ скрипты модального меню -------------------

// появление/исчезновение кнопки вызова модалки в процессе прокрутки окна
const btnOpenElem = document.getElementById('modalBtn');
let minY = 500;
window.onscroll = function () {
  // отслеживаем координаты по оси Y
  const pageY = () => (window.pageYOffset || window.scrollY);
  let scrollYPos = pageY();
  // смотрим на разрешение окна браузера
  const widthWin = document.body.clientWidth;
  if (widthWin < 480) { minY = 200 } else { minY = 100 };
  // if координаты больше minY, то показываем кнопку, else убираем
  if (scrollYPos >= minY) {
    btnOpenElem.classList.add('_visible');
  } else {
    btnOpenElem.classList.remove('_visible');
  };
};


// убрать скролл страницы после отображения модального окна
document.addEventListener("DOMContentLoaded", function () {
  // вычисляем ширину полосы прокрутки и берем ее модуль
  const scrollbar = Math.abs(document.body.clientWidth - window.innerWidth) + 'px';
  console.log(scrollbar);

  const pageOffset = () => (window.pageYOffset || window.scrollY);
  let prevBodyOverflow = document.body.style.overflow || 'initial'; // сохраняем значение overflow на старте страницы
  let prevScrollYPosition = 0; // вводим переменную для сохранения параметра scrollY

  // функция отрабатывающая открытие модального окна
  function openModal(selector) {
    prevScrollYPosition = pageOffset(); // сохраняем значение параметра scrollY
    prevBodyOverflow = document.body.style.overflow; // сохраняем значение overflow до открытия модалки
    const el = document.getElementById(selector);
    el.classList.add('_opened'); // добавляем модификатор _opened
    document.body.style.overflow = 'hidden'; // скрываем полосу прокрутки
    document.body.style.marginRight = scrollbar; // компенсируем отсутсвие полосы прокрутки (иначе будет скачкообразнное смещение страницы)
  }
  // функция отрабатывающая закрытие модального окна
  function closeModal(selector) {
    const el = document.getElementById(selector);
    el.classList.remove('_opened'); // удаляем модификатор _opened
    // ждем пока отработает transition в CSS, чтобы вернуть полосу прокрутки
    setTimeout(() => {
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.marginRight = 0;
    }, 200); // время transition в CSS        
  }

  // смотрим на какую кнопку нажали
  // это кнопки вызывающие открытие модалки
  const modalTrigger = Array.from(document.querySelectorAll('[data-modal]')); // формируем массив из всех элементов содержащих data-modal
  console.log(modalTrigger); // проверяем, что он сформировался
  // перебираем массив и выделяем элемент по которому кликнули
  modalTrigger.forEach(element => {
    element.addEventListener('click', event => {
      const targetModalId = event.target.attributes['data-modal'].value;
      console.log(targetModalId); // проверяем тот ли это элемент
      openModal(targetModalId); // обращаемся к функции, которая откроет модалку
    });
  });

  // смотрим на какую кнопку нажали
  // это кнопки вызывающие закрытие модалки
  const modalCloseTrigger = Array.from(document.querySelectorAll('[data-modal-close]'));
  console.log(modalCloseTrigger);
  modalCloseTrigger.forEach(element => {
    element.addEventListener('click', event => {
      const targetModalId = event.target.attributes['data-modal-close'].value;
      console.log(targetModalId);
      closeModal(targetModalId);
    });
  });

});