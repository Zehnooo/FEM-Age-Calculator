import { newEl } from './utils.js';

const createMessage = (result) => {
    const status = result.success === false ? 'error' : 'success';
    return newEl('p', result.message, null, ['msg', status]);
}

export const showMessage = (inputName, result) => {
    const tray = document.querySelector(`#${inputName}-messages`);
    tray.append(createMessage(result));
}

export const applyStatusClass = (inputName, inputStatus) => {
    const el = document.querySelector(`#${inputName}-container`);
    if (el) el.classList.add(inputStatus === false ? 'error' : 'success');
}

export const updateAgeElements = (inputName, value) => {
    document.querySelector(`#${inputName}-result`).textContent = value;
}