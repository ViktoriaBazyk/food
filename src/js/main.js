'use strict';


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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // курс доллара 
            this.changeToUAH();
        }

        changeToUAH() { // метод класса (конвертор в гривну)
            this.price = this.price * this.transfer;
        }
        
        createMenuItem() { // метод класса
            const element = document.createElement('div');

            if(this.classes.length === 0) { // проверка есть ли у элемента главный класс
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>

            `;
            this.parent.append(element);
        }

    }


    /* const menuItem = new MenuCard( // создаем новый объект 
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        9,
        '.menu .container'
    );

    menuItem.createMenuItem(); // вызываем метод */


    // тоже самое что сверху 
    new MenuCard( // создаем новый объект 
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        9,
        '.menu .container'
    ).createMenuItem(); // вызываем метод 

    new MenuCard( // создаем новый объект 
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        14,
        '.menu .container',
        'menu__item'
    ).createMenuItem();

    new MenuCard( // создаем новый объект 
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        21,
        '.menu .container',
        'menu__item'
    ).createMenuItem();

    // Forms_____________________________________________________

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Регистрация прошла успешно!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // под каждую форму подвязываем функцию postData, перебираем псевдомассив 
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');// добавляем div для оповещения после регистрации
            statusMessage.classList.add('status');// добавляем класс к div'у
            statusMessage.textContent = message.loading;// добавляем текст на страницу
            form.append(statusMessage);// добавляем сообщение к форме


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});