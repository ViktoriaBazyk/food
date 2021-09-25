/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/browser-sync/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/browser-sync/dist/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '#' (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> #! /usr/bin/env node\n| \"use strict\";\n| /**");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  create
} = __webpack_require__(/*! browser-sync */ "./node_modules/browser-sync/dist/index.js");

window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  hideTabContent();

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  showTabContent();
  tabsParent.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    if (target && target.matches('.tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); //Timer____________________________________________________________________________________

  const deadline = '2021-09-18 20:00';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          //оператор % делит выражение на 24 и отдает остаток
    minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      // чтобы вернуть переменные наружу используем оператор return, но при этом возвращаем объект
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    // функция которая установит часы на страницу
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); // Modal____________________________________________________________________________________

  const modalBtn = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modalWindow = document.querySelector('.modal');

  function openModal() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); //закрываем модальное окно 
  }

  modalBtn.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalWindow.addEventListener('click', e => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    // закрываем модальное окно кнопкой esc
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
      //если нажата кнопка esc и класс шоу
      closeModal(); // то закрыть окно при нажатии кнопки esc
    }
  });
  const modalTimerId = setTimeout(openModal, 10000); // выскакивающее модальное окно через 10сек

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); // Make cards through classes________________________________________________________________

  /*  class MenuCard {
       constructor(src, alt, title, descr, price, parentSelector) {
           this.src = src;
           this.alt = alt;
           this.title = title;
           this.descr = descr;
           this.price = price;
           this.parent = document.querySelector(parentSelector);
           this.transfer = 27;
           this.changeToUAH();
       }
        changeToUAH() {
           this.price = this.price * this.transfer;
       }
       
       createMenuItem() {
           const element = document.createElement('div');
           element.innerHTML = `
               <div class="menu__item">
                   <img src=${this.src} alt=${this.alt}>
                   <h3 class="menu__item-subtitle">${this.title}</h3>
                   <div class="menu__item-descr">${this.descr}</div>
                   <div class="menu__item-divider"></div>
                   <div class="menu__item-price">
                       <div class="menu__item-cost">Цена:</div>
                       <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                   </div>
               </div>
           `;
           this.parent.append(element);
       }
    }
    const menuItem = new MenuCard(
       "img/tabs/vegy.jpg",
       "vegy",
       'Меню "Фитнес"',
       'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
       9,
       '.menu .container'
   );
    menuItem.createMenuItem(); */
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map