'use strict';

function handleSubmit(evt) {
    evt.preventDefault(); //отменяем действия по умолчанию

    const phone = phoneInputEl.value.trim();
    const data = {
        phone,
    };

    //очищаем поля для ошибок
    messageEl.textContent = '';
    phoneErrorEl.textContent = '';
    phoneInputEl.textContent = '';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:9999/api/hw14');

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleSuccess;
    xhr.onerror = handleError;
    xhr.send(JSON.stringify(data));

}

function handleSuccess(evt) {
    if (evt.target.status !== 200) {
        messageEl.textContent = 'Произошла ошибка';
        const data = JSON.parse(evt.target.responseText);
        phoneErrorEl.textContent = data.error;
        return;
    }

    const data = JSON.parse(evt.target.responseText);
   //пше console.log(data);
    // TODO: work with data

    messageEl.textContent = 'Успешно отправлено! Наш менеджер перезвонит в течение 15 минут.';

}

function handleError(evt) {
// TODO: handle error
    if (evt.target.status === 400) {
        messageEl.textContent = 'Произошла ошибка';
        const data = JSON.parse(evt.target.responseText);
        phoneErrorEl.textContent = data.error;
        return;
    }
}


const formEl = document.getElementById('callback-form');
formEl.addEventListener('submit', handleSubmit);

//formEl.onclick = handleSubmit;

const messageEl = document.getElementById('message');
const phoneInputEl = document.getElementById('phone-input');
const phoneErrorEl = document.getElementById('phone-error');