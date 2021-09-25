'use strict';

const { create } = require("browser-sync");

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

    tabsParent.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if(target && target.matches('.tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer____________________________________________________________________________________

    const deadline = '2021-09-18 20:00';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours =  Math.floor(t / (1000 * 60 * 60) % 24), //оператор % делит выражение на 24 и отдает остаток
              minutes =  Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return { // чтобы вернуть переменные наружу используем оператор return, но при этом возвращаем объект
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

    function setClock(selector, endtime) { // функция которая установит часы на страницу
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

    setClock('.timer', deadline);


    // Modal____________________________________________________________________________________
    
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

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // закрываем модальное окно кнопкой esc
        if(e.code === 'Escape' && modalWindow.classList.contains('show')) { //если нажата кнопка esc и класс шоу
            closeModal();// то закрыть окно при нажатии кнопки esc
        }
    });

    const modalTimerId = setTimeout(openModal, 10000);// выскакивающее модальное окно через 10сек

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Make cards through classes________________________________________________________________

    class MenuCard {
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

    menuItem.createMenuItem();


});