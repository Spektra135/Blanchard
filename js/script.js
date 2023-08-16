document.addEventListener('DOMContentLoaded', function () {

  const scriptLoader = ScriptLoader();

  // Slider-header
  new Swiper('.promo__swiper-container', {
    effect: 'fade',
    crossfade: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  // Burger
  // Open - close the burger
  document.querySelector('#header__burger').addEventListener('click', function (event) {
    document.querySelector('#header__nav').classList.toggle('header__nav-list--active');
    document.querySelector('#header__account').classList.toggle('header__account--active');
    event.currentTarget.classList.toggle('header__burger--close');
    event.currentTarget.blur();
  });

  // Search-input for adaptive
  // Open - close the search-input for adaptive
  document.querySelector('#header__search-button').addEventListener('click', function (event) {
    document.querySelector('#header__search-input').classList.add('header__search-input--active');
    document.querySelector('#header__logo').classList.add('header__logo--disabled');
    document.querySelector('#header__burger').classList.add('header__burger--disabled');
    document.querySelector('#header').classList.add('header--mobile');
    document.querySelector('#header__search-close-button').classList.add('header__search-close-button--active');
    event.currentTarget.classList.add('header__search-button--active');
  });
  document.querySelector('#header__search-close-button').addEventListener('click', function (event) {
    document.querySelector('#header__search-input').classList.remove('header__search-input--active');
    document.querySelector('#header__logo').classList.remove('header__logo--disabled');
    document.querySelector('#header__burger').classList.remove('header__burger--disabled');
    document.querySelector('#header').classList.remove('header--mobile');
    document.querySelector('#header__search-button').classList.remove('header__search-button--active');
    event.currentTarget.classList.remove('header__search-close-button--active');
  });
  //Disable submit on first click (without filling in the input)
  document.querySelector('#header__search-form').addEventListener('submit', function (event) {
    const searchValue = document.querySelector('#header__search-input').value;
    if (!searchValue || searchValue.length < 3) {
      event.preventDefault();
    }
  });

  // Drop-down
  //Opens the drop-down menu when the drop-down button is clicked, and closes other drop-down menus.
  document.querySelectorAll('.header__dropdown-button').forEach(function (dropdownButton) {
    dropdownButton.addEventListener('click', function (event) {
      document.querySelectorAll('.header__dropdown-button').forEach(function (buttonClear) {
        if (dropdownButton !== buttonClear) {
          buttonClear.classList.remove('header__dropdown-button--active')
        }
      });
      event.currentTarget.classList.toggle('header__dropdown-button--active');
      const path = event.currentTarget.dataset.path;
      document.querySelectorAll('.header__dropdown-list-box').forEach(function (dropdownList) {
        dropdownList.classList.remove('header__dropdown-list-box--show')
      });
      if (event.currentTarget.classList.contains('header__dropdown-button--active')) {
        document.querySelector(`.header__dropdown-list-box[data-target="${path}"]`).classList.add('header__dropdown-list-box--show')
      } else {
        document.querySelector(`.header__dropdown-list-box[data-target="${path}"]`).classList.remove('header__dropdown-list-box--show')
      }
    });
  });
  // Closes the dropdown menu when clicked outside of it.
  window.addEventListener('click', function (event) {
    if (!event.target.matches('.header__dropdown-button')) {
      const dropdownList = document.querySelectorAll('.header__dropdown-list-box');
      for (let i = 0; i < dropdownList.length; i++) {
        const openDropdown = dropdownList[i];
        if (openDropdown.classList.contains('header__dropdown-list-box--show')) {
          openDropdown.classList.remove('header__dropdown-list-box--show');
        }
      }
      const dropdownButton = document.querySelectorAll('.header__dropdown-button');
      for (let i = 0; i < dropdownButton.length; i++) {
        const activeDropdown = dropdownButton[i];
        if (activeDropdown.classList.contains('header__dropdown-button--active')) {
          activeDropdown.classList.remove('header__dropdown-button--active');
        }
      }
    }
  });

  //Custom scroll
  setTimeout(function () {
    scriptLoader.load('simplebar', 'js/vendor/simplebar.min.js').then(simpleBarInit);
  }, 1000)


  // Slider-gallery
  new Swiper('.gallery__swiper-container', {
    preloadImages: false,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    spaceBetween: 0,
    breakpoints: {
      1650: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        slidesPerColumn: 2,
        spaceBetween: 49,
      },
      1450: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        slidesPerColumn: 2,
        spaceBetween: 25,
      },
      1250: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        slidesPerColumn: 2,
        spaceBetween: 31,
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        slidesPerColumn: 2,
        spaceBetween: 31,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        slidesPerColumn: 2,
        spaceBetween: 26,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerColumn: 1,
        spaceBetween: 10,
      },
    },
    lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: true,
    },
    navigation: {
      prevEl: '.gallery__swiper-button-prev',
      nextEl: '.gallery__swiper-button-next',
    },
    pagination: {
      el: '.swiper-pagination-gallery.swiper-pagination',
      type: 'fraction',
    },
    keyboard: {
      enable: true,
      onlyInViewport: true,
      pageUpDown: false,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    watchOverflow: true,
    slidesPerColumnFill: 'row',
    a11y: {
      nextSlideMessage: 'Следующая страница слайда',
      prevSlideMessage: 'Предыдущая страница слайда',
    }
  });

  // Modal-gallery
  // Open modal window and overlay background
  document.querySelectorAll('.gallery__slide').forEach(function (openModal) {
    openModal.addEventListener('click', function (event) {
      document.querySelector('body').classList.add('modal-no-scroll-body');
      const modal = document.querySelector('.modal-window');
      modal.classList.add('modal-window--active');
      document.querySelector('.overlay').classList.add('overlay-active');
      // Filling a modal window from the data-attribute
      modal.querySelector('.modal-content__slide').src = event.currentTarget.dataset.srcFull;
      modal.querySelector('.modal-content__text-name').innerHTML = event.currentTarget.dataset.name;
      modal.querySelector('.modal-content__text-title').innerHTML = event.currentTarget.dataset.title;
      modal.querySelector('.modal-content__text-period').innerHTML = event.currentTarget.dataset.period;
      modal.querySelector('.modal-content__text-desc').innerHTML = event.currentTarget.dataset.desc;
    });
  });
  // Close modal window and overlay background with click at "close-button"
  document.querySelector('.modal-content__closed').addEventListener('click', function () {
    document.querySelector('.modal-window').classList.remove('modal-window--active', 'form-content');
    document.querySelector('.overlay').classList.remove('overlay-active');
    document.querySelector('body').classList.remove('modal-no-scroll-body');
  });
  // Close modal window and overlay background when clicked outside of modal window
  document.querySelector('.overlay').addEventListener('click', function (event) {
    document.querySelector('.modal-window').classList.remove('modal-window--active', 'form-content');
    event.currentTarget.classList.remove('overlay-active');
    document.querySelector('body').classList.remove('modal-no-scroll-body');
  });

  setTimeout(function () {
    // Custom select
    scriptLoader.load('choices', 'https://unpkg.com/choices.js@9.0.1/public/assets/scripts/choices.min.js').then(choiceInit);
    // Catalog
    scriptLoader.load('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js').then(function () {
      scriptLoader. load('jquery-ui', 'js/vendor/jquery-ui.min.js').then(catalogInit);
    })
  }, 1000);

  // Events
  // Slider-events (mobile)
  const sliderEvents = document.querySelector('.events-container');
  let mySwiperEvents;
  function sliderMobile() {
    if (window.innerWidth <= 767 && sliderEvents.dataset.initializedSwiper === 'false') {
      mySwiperEvents = new Swiper(sliderEvents, {
        pagination: {
          el: '.swiper-pagination-events.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerColumn: 1,
        spaceBetween: 60,
      });
      sliderEvents.dataset.initializedSwiper = 'true';
    }
    if (window.innerWidth > 767) {
      sliderEvents.dataset.initializedSwiper = 'false';
      if (sliderEvents.classList.contains('swiper-container-initialized')) {
        mySwiperEvents.destroy();
      }
    }
  }
  sliderMobile();
  window.addEventListener('resize', function() {
    sliderMobile();
  });
  //Clicking the button to hide it and show all elements
  document.querySelector('.events__button').addEventListener('click', function(event) {
    event.currentTarget.style.display = 'none';
    document.querySelectorAll('.events__item').forEach(function(element) {
      element.classList.add('events__item--active');
    });
  });

  // Publication
  // Publication-slider
  new Swiper('.publication__swiper-container', {
    preloadImages: false,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    spaceBetween: 0,
    breakpoints: {
      1400: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 49,
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 33,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: -16,
      },
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        slidesPerColumn: 4,
        spaceBetween: 0,
      },
    },
    lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: true,
    },
    navigation: {
      prevEl: '.publication__swiper-button-prev',
      nextEl: '.publication__swiper-button-next',
    },
    pagination: {
      el: '.swiper-pagination-publication.swiper-pagination',
      type: 'fraction',
    },
    keyboard: {
      enable: true,
      onlyInViewport: true,
      pageUpDown: false,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    watchOverflow: true,
    slidesPerColumnFill: 'row',
    a11y: {
      nextSlideMessage: 'Следующая страница слайда',
      prevSlideMessage: 'Предыдущая страница слайда',
    }
  });

  // Checkbox (mobile)
  // Open - close list of checkbox (mobile)
  document.querySelector('.publication__caption-checkbox').addEventListener('click', function(event) {
    const checkboxList = document.querySelector('.publication__checkbox-list');
    if (checkboxList.classList.contains('publication__checkbox-list--show')) {
      checkboxList.classList.remove('publication__checkbox-list--show');
    } else {
      document.querySelector('.publication__checkbox-list').classList.add('publication__checkbox-list--show');
    }
    event.currentTarget.classList.toggle('publication__caption-checkbox--active');
  });
  // Show selected checkbox items when the list of checkbox is closed (mobile)
  document.querySelectorAll('.publication__checkbox').forEach(function(checkboxInput) {
    const checkboxItem = checkboxInput.closest('.publication__checkbox-item');
    if (checkboxInput.checked) {
      checkboxItem.classList.add('publication__checkbox-item--active');
    }
  });
  // Select and deselect of checkbox (mobile)
  document.querySelectorAll('.publication__checkbox').forEach(function(checkboxInput) {
    checkboxInput.addEventListener('click', function(eventCheck) {
      const checkboxItem = eventCheck.currentTarget.closest('.publication__checkbox-item');
      checkboxItem.classList.toggle('publication__checkbox-item--active');
    });
  });

  //Tooltip
  setTimeout(function () {
    scriptLoader.load('popper.js', 'https://unpkg.com/@popperjs/core@2').then(function () {
      scriptLoader. load('tippy.js', 'https://unpkg.com/tippy.js@6').then(tooltipInit);
    })
  }, 2000);

  // Project-slider
  new Swiper('.project__swiper-container', {
    preloadImages: false,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    spaceBetween: 0,
    breakpoints: {
      1400: {
        slidesPerView: 3.001,
        slidesPerGroup: 1,
        spaceBetween: 49,
      },
      1024: {
        slidesPerView: 2.001,
        slidesPerGroup: 2,
        spaceBetween: 42,
      },
      768: {
        slidesPerView: 2.001,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      320: {
        slidesPerView: 1.001,
        slidesPerGroup: 1,
        slidesPerColumn: 1,
        spaceBetween: 5,
      },
    },
    navigation: {
      prevEl: '.project__swiper-button-prev',
      nextEl: '.project__swiper-button-next',
    },
    keyboard: {
      enable: true,
      onlyInViewport: true,
      pageUpDown: false,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    watchOverflow: true,
    slidesPerColumnFill: 'row',
    a11y: {
      nextSlideMessage: 'Следующая страница слайда',
      prevSlideMessage: 'Предыдущая страница слайда',
    }
  });

  setTimeout(function () {
    // Yandex Map
    scriptLoader.load('ymaps', 'https://api-maps.yandex.ru/2.1/?apikey=yourApikey&lang=ru_RU').then(ymapsInit);
    // form
    scriptLoader.load('just-validate', 'js/vendor/just-validate.min.js').then(formInit);
  }, 2000);

});

function ScriptLoader() {
  let promise = {};

  return {
    load: function (name, src) {
      if (promise[name]) {
        return promise[name];
      } else {
        /*console.log(`${name} script loading...`);*/
        promise[name] = new Promise(function(resolve) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src;
          script.onload = function() {
            setTimeout(function()  {
              resolve(true);
            }, 100);
          };
          const body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
        });
        return promise[name];
      }
    }
  };
}

function choiceInit() {
  const element = document.querySelector('#selectCustom');
  new Choices(element, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
  });
}

function simpleBarInit() {
  new SimpleBar(document.querySelector('.custom-scroll-js'), {
    autoHide: false,
  });
}

function tooltipInit() {
  tippy('#tooltip-one', {
    content: 'Пример современных тенденций - современная методология разработки',
    maxWidth: 264,
    trigger: 'mouseenter click focusin',
  });
  tippy('#tooltip-two', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    maxWidth: 264,
    trigger: 'mouseenter click focusin',
  });
  tippy('#tooltip-three', {
    content: 'В стремлении повысить качество',
    maxWidth: 232,
    trigger: 'mouseenter click focusin',
  });
}

function catalogInit() {
  const painterInfo = PainterInfo();

  //Catalog
  //Accordion
  $( "#catalog__accordion" ).accordion({
    collapsible: true,
    heightStyle: 'content',
    active: 0,
    //function to activate first painter in the list--active at new panel opening
    activate: function (event, ui) {
      if (ui.newPanel) {
        const searchPainter = ui.newPanel.find('.accordion__list--active .accordion__item-button').get(0);
        if (searchPainter) {
          searchPainter.click();
        } else {
          painterInfo.setPainter('default');
        }
      }
    },
  });
  //function to remove/add class "*--active" for items by help the data-attribute
  function selectElements(currentClass, dataValue, dataName = 'target') {
    document.querySelectorAll(`.${currentClass}`).forEach(function (element) {
      element.classList.remove(`${currentClass}--active`);
    });
    document.querySelectorAll(`.${currentClass}[data-${dataName}="${dataValue}"]`).forEach(function (event) {
      event.classList.add(`${currentClass}--active`);
    });
  }
  // open - close flag-tabs
  document.querySelectorAll('.catalog__flag-button').forEach(function (flagButton) {
    flagButton.addEventListener('click', function (event) {
      const country = event.currentTarget.dataset.path;
      selectElements('catalog__flag-button', country, 'path');
      selectElements('catalog__description', country);
      selectElements('accordion__list', country);
      //activate first painter in the list--active when changing flag-tabs
      const searchPainter = document.querySelector('.ui-accordion-content-active .accordion__list--active .accordion__item-button');
      if (searchPainter) {
        searchPainter.click();
      } else {
        painterInfo.setPainter('default');
      }
    });
  });
  // open - close accordion and scroll to active painter content (mobile)
  let activeContentPainter = "";
  document.querySelectorAll('.accordion__item-button').forEach(function (accordionButton) {
    accordionButton.addEventListener('click', function (event) {
      const pathValue = event.currentTarget.dataset.path;

      selectElements('accordion__item-button', pathValue, 'path');
      painterInfo.setPainter(pathValue);
      activeContentPainter = pathValue;
      scrollContent();
    });
  });
  // Function to scroll to active painter content (mobile)
  function scrollContent() {
    let newWidth = window.innerWidth;
    if (newWidth < 1024) {
      document.querySelector(".catalog__painter-info").scrollIntoView();
    }
  }
}

function ymapsInit() {
  //Map
  const width = document.body.offsetWidth;
  let coordinates = {
    center: [55.762161, 37.644800],
    zoom: 14.4,
  };
  if (width < 1650) {
    coordinates.center = [55.761826, 37.616045];
    coordinates.zoom = 14;
  }
  if (width < 1023) {
    coordinates.center = [55.762761, 37.611324];
    coordinates.zoom = 14;
  }

  // Функция ymaps.ready() будет вызвана, когда загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  ymaps.ready(init);
  function init(){
    // Создание карты.
    const myMap = new ymaps.Map("map", {
      center: coordinates.center,
      zoom: coordinates.zoom,
    });
    const myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../image/contacts/map-marker.svg',
      iconImageSize: [20, 20],
    });
    new ymaps.GeoObject({});
    // Создание геообъекта с типом точка (метка).
    myMap.geoObjects.add(myPlacemark);
  }
}

function formRequestAnswer(text) {
  document.querySelector('body').classList.add('modal-no-scroll-body');
  const modal = document.querySelector('.modal-window');
  modal.classList.add('modal-window--active', 'form-content');
  document.querySelector('.overlay').classList.add('overlay-active');
  modal.querySelector('.modal-content__text-name').innerHTML = text;
}

function formInit() {
  //Phone mask
  let selector = document.querySelector("input[type='tel']");
  let im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);

  //Form validation
  new JustValidate('.form-feedback', {
    rules: {
      name: {
        required: true,
        function: function(name, value) {
          return value.length > 2;
        },
      },
      tel: {
        required: true,
        function: function(name, value) {
          return value.match(/(\+7|8)\s?\(?[0-9]{3}\)?\s?[0-9]{3}-?[0-9]{2}-?[0-9]{2}/);
        },
      },
    },
    colorWrong: '#D11616',
    messages: {
      name: {
        required: 'Введите имя',
        function: 'Недопустимый формат'
      },
      tel: {
        required: 'Введите номер телефона',
        function: 'Недопустимый формат'
      },
    },
    submitHandler: function (form, values, ajax) {
      form.classList.add('form-feedback__sending')
      ajax({
        url: 'https://spektra.wordcord.org/sendmail.php',
        method: 'POST',
        data: values,
        async: true,
        callback: function(response)  {
          const json = JSON.parse(response);
          let answer = '';
          if (json.sent) {
            form.reset();
            answer = 'Email отправлен!';
          } else {
            answer = 'Ошибка! Попробуйте отправить позже.';
          }
          form.classList.remove('form-feedback__sending')
          formRequestAnswer(answer);
        }
      });
    },
  });

  // prevent reload page
  document.getElementById('form-feedback').addEventListener('submit', function formSend(e) {
    e.preventDefault();
  });
}

function PainterInfo() {
  let json = null;

  function load() {
    return fetch('json/painters.json')
        .then( function(response) {
          return response.json();
        })
        .then(function(data)  {
          json = data;
        });
  }

  return {
    setPainter: async function (uid) {
      if (json === null) {
        await load();
      }
      const content = json.find(function (record) {
        return record.uid === uid;
      });
      if (content) {
        const boxContent = document.querySelector('.painter-content');
        boxContent.querySelector('.catalog__painter-img').src = content.src;
        boxContent.querySelector('.catalog__painter-img').alt = content.alt;
        boxContent.querySelector('.catalog__painter-name').innerHTML = content.name;
        const linkBox = boxContent.querySelector('.catalog__link-to-gallery');
        const dateBox = boxContent.querySelector('.catalog__painter-date');
        if (content.date) {
          dateBox.innerHTML = content.date;
          dateBox.style.display = 'block';
          linkBox.classList.add('catalog__link-to-gallery--hidden');
        } else {
          dateBox.style.display = 'none';
          linkBox.classList.remove('catalog__link-to-gallery--hidden');
        }
        boxContent.querySelector('.catalog__painter-description').innerHTML = content.desc;
      }
    },
  }
}