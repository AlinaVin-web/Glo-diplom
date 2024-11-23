import { animate } from './helpers.js';
const slider = ({ sliderBlockSelector, sliderWrapSelector, slidesSelector, leftArrowClass, rightArrowClass, countActiveSlides = 2, slideActiveClass = 'active-slide' }) => {
    try {
        const sliderBlock = document.querySelector(sliderBlockSelector);
        if (!sliderBlock) return;
        const slides = sliderBlock.querySelectorAll(slidesSelector);
        const leftArrow = sliderBlock.querySelector(leftArrowClass);
        const rightArrow = sliderBlock.querySelector(rightArrowClass);
        let currentSlide = 0;
        let lastActiveSlide = countActiveSlides - 1;
        let sliderWrap = false;
        if (sliderWrapSelector) {
            sliderWrap = sliderBlock.querySelector(sliderWrapSelector);
        }

        const prevSlide = (elems, index, strClass) => {
            elems[index].classList.remove(strClass);
        }
        const nextSlide = (elems, index, strClass) => {
            elems[index].classList.add(strClass);
            animate({
                duration: 200,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    elems[index].style.transform = `scale(${0.9 + progress * 0.1})`;
                }
            });
        }

        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            if (lastActiveSlide + 1 < slides.length) {
                currentSlide++;
                lastActiveSlide++;
                prevSlide(slides, currentSlide - 1, slideActiveClass);
                nextSlide(slides, lastActiveSlide, slideActiveClass);
                leftArrow.classList.remove('arrow-disable');
            }
            if (lastActiveSlide + 1 >= slides.length) {
                rightArrow.classList.add('arrow-disable');
            }
        });

        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentSlide - 1 >= 0) {
                currentSlide--;
                lastActiveSlide--;
                prevSlide(slides, lastActiveSlide + 1, slideActiveClass);
                nextSlide(slides, currentSlide, slideActiveClass);
                rightArrow.classList.remove('arrow-disable');
            }
            if (currentSlide - 1 < 0) {
                leftArrow.classList.add('arrow-disable');
            }
        });

        if (!slides || !leftArrow || !rightArrow) return;

        if (screen.width < 576) {
            lastActiveSlide = currentSlide;
            if (sliderWrap) {
                sliderWrap.style.justifyContent = 'center';
            }
        }
        if (lastActiveSlide === slides.length - 1 || countActiveSlides < 1 || lastActiveSlide + 1 > slides.length) {
            rightArrow.classList.add('arrow-disable');
            leftArrow.classList.add('arrow-disable');
            return;
        }
        slides.forEach((slide, key) => {
            slide.style.display = 'none';
            if (key <= lastActiveSlide) slide.classList.add(slideActiveClass);
        });
        leftArrow.classList.add('arrow-disable');

    } catch (error) {
        console.log(error);
    }
}
export default slider;