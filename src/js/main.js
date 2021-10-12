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
    
    const modalBtn = document.querySelectorAll('[data-modal]'), // data-modal кастомный атрибут
          modalWindow = document.querySelector('.modal');

    
    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // убираем скрол страницы при открытом модальном окне
        clearInterval(modalTimerId); //удаляем выскакивающее мод окно, если юзер сам открыл модалку
    }
    modalBtn.forEach(btn => { // перебираем кнопки в псевдомассиве
        btn.addEventListener('click', openModal);// навешиваем обработчик события клик и передаем функцию
    });

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = ''; // востанавливаем скрол на странице
    }

    modalWindow.addEventListener('click', (e) => { // закрытие модального окна кликом на подложку, любое пространство вне модального окна
        if(e.target === modalWindow || e.target.getAttribute('data-close') == '') { //если клик произведен на подложку или крестик
            closeModal(); // закрыть модальное окно
        }
    });

    document.addEventListener('keydown', (e) => { // закрываем модальное окно кнопкой esc
        if(e.code === 'Escape' && modalWindow.classList.contains('show')) { //если нажата кнопка esc и проверка что у модального окна есть класс show, то есть оно открыто
            closeModal();// то закрыть окно при нажатии кнопки esc
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);// выскакивающее модальное окно через 50сек

    function showModalByScroll() { // выпрыгивающее мод окно если пользователь долистал до конца страницы
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
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // под каждую форму подвязываем функцию postData, перебираем псевдомассив 
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');// здесь создали изображение 
            statusMessage.src = message.loading; // здесь подставили атрибут src, а путь взяли выше с объекта message
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);// добавляем спинер за приделы flex контейнера во второй форме


            const formData = new FormData(form);// делает так, чтобы все данные которые заполнил пользователь мы получили в js и могли отправить на сервер

            const object = {};// перебираем данные из объекта formData и кладем в рустой объект
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            
            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'// отправляем данные в формате json
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);// вызываем функцию с модальным окном благодарностей, где в аргумент передаем сообщение с объекта message
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();// очищаем форму инпуты
            });
            

            // Код который использовался для XMLHttpRequest, выше современный метод отправки данных на сервер

            /* request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);// вызываем функцию с модальным окном благодарностей, где в аргумент передаем сообщение с объекта message
                    form.reset(); // очищаем форму инпуты
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            }); */
        });
    }

    function showThanksModal(message) {
        const firstModalDialog = document.querySelector('.modal__dialog');// у этого класса уже есть определенные стили, которые подойдут нам для нового модального окна

        firstModalDialog.classList.add('hide');
        openModal();

        const thanksModalWrapper = document.createElement('div');
        thanksModalWrapper.classList.add('modal__dialog');
        thanksModalWrapper.innerHTML =`
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModalWrapper);

        setTimeout(() => { // удаление блока thanksModalWrapper чтобы клиент снова мог отправить заявку
            thanksModalWrapper.remove();
            firstModalDialog.classList.add('show');
            firstModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
    
});