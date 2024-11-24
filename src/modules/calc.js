import { animate } from "./helpers.js";

const calc = () => {
    const calcBlock = document.getElementById('calc');
    const calcTotal = document.getElementById('calc-total');
    const result = {};

    calcBlock.addEventListener('input', (e) => {
        let sum = 1;
        if (e.target.id === 'calc-input') {
            e.target.value = e.target.value.replace(/\D+/gi, '');
        }

        if ((e.target.matches('select') && e.target.options[0].selected) || e.target.value === '') result[e.target.id] = '';
        else result[e.target.id] = e.target.value;

        if (result['calc-input'] && result['calc-type']) {
            for (let key in result) {
                if (result[key] !== '') { sum *= result[key]; }
            }
            animate({
                duration: 300,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    calcTotal.value = Math.round(progress * sum);
                }
            });
        }
        else calcTotal.value = '';
    });
}
export default calc;