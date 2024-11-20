const scroll = () => {
    const smoothScroll = document.querySelector('.smooth-scroll');
    const offerBlock = document.getElementById('offer');
    let scrollCount;
    let idAnimation;

    const scrollAnimation = () => {
        scrollCount -= 50;
        idAnimation = requestAnimationFrame(scrollAnimation);
        if (scrollCount >= 0) scrollTo(0, scrollCount);
        else {
            scrollTo(0, 0);
            cancelAnimationFrame(idAnimation);
        }
    }

    smoothScroll.addEventListener('click', () => {
        scrollCount = scrollY;
        idAnimation = requestAnimationFrame(scrollAnimation);
    })

    window.addEventListener('scroll', function () {
        if (scrollY < offerBlock.offsetTop + offerBlock.offsetHeight) {
            smoothScroll.style.opacity = '';
            smoothScroll.style.pointerEvents = '';
        }
        else {
            smoothScroll.style.opacity = 1;
            smoothScroll.style.pointerEvents = 'auto';
        }
    });

}
export default scroll;