import { animate } from './helpers';

const callModals = () => {
    const overlay = document.querySelector('.overlay');

    const openModal = (name) => {
        const modal = document.querySelector(`.${name}-modal`);
        overlay.style.display = 'block';
        modal.style.display = 'block';
        modal.classList.add('active');
        if (screen.width >= 768) {
            animate({
                duration: 150,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    modal.style.top = progress * 50 + '%';
                }
            });
        }
    }
    const closeModal = (modal) => {
        overlay.style.display = '';
        modal.style.display = '';
        modal.classList.remove('active');
    }

    try {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a.btn-modal')) {
                e.preventDefault();
                openModal(e.target.dataset.modal);
            }
            else if (e.target.matches('span.modal-close')) {
                closeModal(e.target.closest('.modal-block'));
            }
            else if (e.target.matches('.overlay')) {
                const activeModal = document.querySelector('.modal-block.active');
                closeModal(activeModal);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export default callModals;