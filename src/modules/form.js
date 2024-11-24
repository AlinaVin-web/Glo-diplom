const form = () => {
    try {
        const statusBlock = document.createElement('div');
        const errorText = 'Ошибка';
        const successText = 'Успешно отправлено!';

        const validate = (list) => {
            let success = true;
            list.forEach(input => {
                if (input.value.trim() === '') {
                    success = false;
                    input.classList.add('error');
                    setTimeout(() => input.classList.remove('error'), 3000);
                }
            });
            return success;
        }

        const sendData = (data) => {
            return fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json());
        }

        const submitForm = (form) => {
            const formElements = form.querySelectorAll('input');
            const formData = new FormData(form);
            const formBody = {};
            statusBlock.classList.add('form-status');
            statusBlock.textContent = 'Отправка...';
            form.append(statusBlock);

            formData.forEach((val, key) => {
                formBody[key] = val.trim();
            });

            const totalInput = document.getElementById('calc-total');
            if (totalInput && totalInput.value.trim() !== '') formBody['calc-total'] = totalInput.value;

            if (validate(formElements)) {
                sendData(formBody)
                    .then(data => {
                        statusBlock.textContent = successText;

                        formElements.forEach(input => {
                            if (input.type !== 'hidden') input.value = '';
                        });
                        setTimeout(() => statusBlock.textContent = '', 3000);
                    })
                    .catch(error => {
                        statusBlock.textContent = errorText;
                        setTimeout(() => statusBlock.textContent = '', 3000);
                    });
            } else {
                statusBlock.textContent = errorText;
                setTimeout(() => statusBlock.textContent = '', 3000);
            }
        }

        document.body.addEventListener('input', (e) => {
            if (e.target.name === 'fio') {
                e.target.value = e.target.value.replace(/[^а-яА-яa-zA-Z -]/g, '');
                e.target.classList.remove('error');
                statusBlock.textContent = '';
            }
            if (e.target.name === 'phone') {
                e.target.value = e.target.value.replace(/[^\d+]/g, '');
                if (e.target.value.length > 16) e.target.value = e.target.value.slice(0, 16);
                e.target.classList.remove('error');
                statusBlock.textContent = '';
            }
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.type === 'submit') {
                e.preventDefault();
                submitForm(e.target.closest('form'));
            }
        });
    } catch (error) {
        console.log(error);
    }
}
export default form;