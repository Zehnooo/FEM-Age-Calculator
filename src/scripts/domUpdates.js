import { newEl } from './utils.js';

const createMessage = (result) => {
    const status = result.success === false ? 'error' : 'success';
    return newEl('p', result.message, null, ['msg', status, 'fs100']);
}

export const showMessage = (inputName, result) => {
    const tray = document.querySelector(`#${inputName}-messages`);
    tray.append(createMessage(result));
}

export const applyStatusClass = (inputName, inputStatus) => {
    const el = document.querySelector(`#${inputName}-tray`);
    if (el) {
        el.className = 'inp-tray fx fdc gp04 test';
        el.classList.add(inputStatus ? 'success' : 'error');
    }
}

export const updateAgeElements = (inputName, value) => {
    document.querySelector(`#${inputName}-result`).textContent = value;
}

export const resetAgeElements = () => {
     document.querySelectorAll('.result > span').forEach(x => x.textContent = '- -');
}

export const updateDigits = (e) => {
    const val = e.target.value.trim();
    if (!val || val === '') return;
    const id = e.target.id;
    const length =  val.length;
    const maxLength = id.includes('year') ? 4 : 2;
    if (length === maxLength) return;
    e.target.value = '0'.repeat(maxLength - length) + val;
}