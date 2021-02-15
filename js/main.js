
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
let entity;

function resetSlide() {
  console.warn(`resetSlide`);

  document.getElementById('additional01').style.display = 'none';

  sliderList.forEach(xr => {
    xr.position._y = 0;
    xr.opacity = 0;

    /*TweenLite.to(
        value.element,
        0,
        {
          opacity: 0,
          display: 'none',
        },
    );*/
  });
}

function slide(num) {
  const ele = sliderList[num];
  // console.warn(ele);

  /*TweenLite.to(
      ele.position,
      0.5,
      {
        ease: Back.easeOut.config(1.7),
        _y: -275,
      });

  TweenLite.to(
      ele.element,
      0.5,
      {
        opacity: 1,
        display: 'block',
      },
  );*/

}

/*function changeModelAngle() {
  console.info(`CHANGE MODEL ANGLE`);

  if (TWEEN) TWEEN.removeAll();

  let startValue = {
    rotationXValue: mesh.rotation.x,
  };
  let endValue = {
    // zoomValue: 5,
    rotationXValue: Math.PI/180 * 25,
  };

  let tween = new TWEEN.Tween(startValue).to(endValue, 800);

  tween.onUpdate(() => {
    mesh.rotation.x = startValue.rotationXValue;
  });
  tween.onComplete(() => {});

  tween.start();
}*/

/*function toggleARView() {
  if (!arFlag) {
    letsee.init(config, onLoaded);
    arFlag = true;
  } else {
    if (letsee.isPause) {
      letsee.resume();
    } else {
      letsee.pause(true);
      resetSlide();
    }
  }
}*/

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
      touchStart: function() {
        console.log('change');
        // resetSlide();
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

function addXRElementsIntoEntity() {

  entity = letsee.getEntityByUri('dr-jart.json');
  let xr_1 = letsee.addXRElement(add01, entity);
  let xr_2 = letsee.addXRElement(add02, entity);
  let xr_3 = letsee.addXRElement(add03, entity);

  sliderList.push(xr_1, xr_2, xr_3);

  sliderList.forEach(xr => {
    xr.position.set(0, 0, 1);
    xr.element.style.visibility = 'hidden';
  });
  console.warn(sliderList);
}

/**
 * Initialize app.
 */
function initApp() {
  console.warn(`initApp`);

  addXRElementsIntoEntity();

  /*const add01 = new letsee.DOMRenderable(document.getElementById('additional01'));
  const add02 = new letsee.DOMRenderable(document.getElementById('additional02'));
  const add03 = new letsee.DOMRenderable(document.getElementById('additional03'));
  sliderList = [add01, add02, add03];*/

  setTimeout(function() {
    /*document.getElementById('add1Active').addEventListener('click', (e) => {
      resetSlide();
      slide(0);
    });
    document.getElementById('add2Active').addEventListener('click', (e) => {
      resetSlide();
      slide(1);
    });
    document.getElementById('add3Active').addEventListener('click', (e) => {
      resetSlide();
      slide(2);
    });*/

    document.querySelectorAll('.closeBtn').forEach(val => {
      val.addEventListener('click', resetSlide);
    });
  }, 0);
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
  add01          = document.getElementById('additional01');
  add02          = document.getElementById('additional02');
  add03          = document.getElementById('additional03');

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

  add1Active.addEventListener('click', (e) => {
    document.getElementsByClassName('addContent')[0].style.display = 'block';

    // resetSlide();
    slide(0);
  });
  add2Active.addEventListener('click', (e) => {
    // resetSlide();
    slide(1);
  });
  add3Active.addEventListener('click', (e) => {
    // resetSlide();
    slide(2);
  });

}