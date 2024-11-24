import callModals from "./modules/call-modals";
import scroll from "./modules/scroll"
import documents from "./modules/documents";
import timer from "./modules/timer";
import slider from "./modules/slider";
import calc from "./modules/calc";

callModals();
scroll();
documents();
timer('27 november 2024');
slider({
    sliderBlockSelector: '#benefits',
    sliderWrapSelector: '.benefits-wrap',
    slidesSelector: '.benefits__item',
    leftArrowClass: '.benefits__arrow--left',
    rightArrowClass: '.benefits__arrow--right',
    countActiveSlides: 3,
    slideActiveClass: 'active-slide'
});
slider({
    sliderBlockSelector: '#services',
    sliderWrapSelector: '',
    slidesSelector: '.services-slide',
    leftArrowClass: '.services__arrow--left',
    rightArrowClass: '.services__arrow--right',
    countActiveSlides: 2,
    slideActiveClass: 'active-slide'
});
calc();