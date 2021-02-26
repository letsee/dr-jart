
let mobile,
    arHeader,
    arBtn,
    contentWrapper,
    swiperContainer,
    add1Active, add01,
    add2Active, add02,
    add3Active, add03;
let arFlag = false,
    isSwiperInitialized = false;
let sliderList = [];

/**
 * Reset slides and additional panels.
 */
function resetSlide() {
  setTimeout(() => {

    add01.style.display = 'none';
    add02.style.display = 'none';
    add03.style.display = 'none';
  }, 10)
}

/**
 * Switch additional slides.
 * @param num
 */
function slide(num) {
  switch (num) {
    case 0:
      add01.style.display = 'block';
      add02.style.display = 'none';
      add03.style.display = 'none';
      break;
    case 1:
      add01.style.display = 'none';
      add02.style.display = 'block';
      add03.style.display = 'none';
      break;
    case 2:
      add01.style.display = 'none';
      add02.style.display = 'none';
      add03.style.display = 'block';
      break;
  }
}

/**
 * Initialize Swiper elements.
 */
function initSwiper() {
  console.warn(`initSwiper`);

  let mainSwiper = new Swiper('#swiper-container', {
    effect: 'coverflow',
    loop: false,
    centeredSlides: true,
    slidesPerView: 1,
    initialSlide: 1,
    preventClicks: false,
    preventClicksPropagation: false,
    coverflowEffect: {
      rotate: 0,
      stretch: -100,
      depth: 650,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagenation',
      type: 'bullets',
      clickable: 'true',
    },
    on: {
      slideChange: function() {
        resetSlide();
      },
    },
  });

  let relatedProductARSwiper = new Swiper('#swiper-related-product-ar', {
    effect: 'flip',
    loop: false,
    autoplay: {
      delay: 3000,
      waitForTransition: false,
    },
    speed: 1000,
    allowTouchMove: false,
    centeredSlides: true,
    slidesPerView: 1,
    initialSlide: 0,
  });

}

/**
 * Add XRElements into Entity.
 */
function getElementString(str){
  return str.replace(/ /, '').trim();
}

/**
 * Create XRElements from DOM Elements and add into Entity.
 */
function addXRElementsIntoEntity() {

  const entity = letsee.getEntityByUri('dr-jart.json');

  let xr_1 = letsee.createXRElement(getElementString(add01.innerHTML));
  let xr_2 = letsee.createXRElement(getElementString(add02.innerHTML));
  let xr_3 = letsee.createXRElement(getElementString(add03.innerHTML));
  letsee.bindXRElement(xr_1, entity);
  letsee.bindXRElement(xr_2, entity);
  letsee.bindXRElement(xr_3, entity);

  sliderList.push(xr_1, xr_2, xr_3);
  sliderList.forEach(xr => {
    xr.position.set(0, 0, 1);
    xr.element.style.visibility = 'hidden';
  });
}

/**
 * Initialize app.
 */
function initApp() {
  console.warn(`initApp`);

  addXRElementsIntoEntity();

  document.querySelectorAll('.closeBtn').forEach(val => {
    val.addEventListener('click', resetSlide);
  });
}

window.onload = () => {

  contentWrapper = document.getElementById('content-wrapper');
  swiperContainer = document.getElementById('swiper-container');
  mobile         = document.getElementById('mobile');
  arHeader       = document.getElementById('arHeader');
  arBtn          = document.querySelector('#arBtn');
  add1Active     = document.getElementById('add1Active');
  add2Active     = document.getElementById('add2Active');
  add3Active     = document.getElementById('add3Active');
  add01          = document.getElementById('additional01'); // slide_0
  add02          = document.getElementById('additional02'); // slide_1
  add03          = document.getElementById('additional03'); // slide_2

  mobile.addEventListener('click', (e) => {
    arHeader.style.display = 'none';
    arBtn.style.display = 'block';
    toggleARView();
  });
  arBtn.addEventListener('click', (e) => {
    console.warn(`AR MODE`);
    arBtn.style.display = 'none';
    contentWrapper.style.display = 'none';

    arHeader.style.display = 'block';
    swiperContainer.style.display = 'block';

    initSwiper();
  });
  add1Active.addEventListener('click', () => slide(0));
  add2Active.addEventListener('click', () => slide(1));
  add3Active.addEventListener('click', () => slide(2));

}