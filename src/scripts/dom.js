import { newEl, collectForm } from './utils.js';
import calc from './calculator.js';
import icons from './icons.js';
import { updateAgeElements } from "./domUpdates.js";

const app = document.querySelector('#app');

const inputs = [
    { day: { min: 1, max: 31, length: 2 }},
    { month: { min: 1, max:  12, length: 2 }},
    { year: { min: 0, max: calc.returnCurrentDate().getFullYear(), length: 4 }}
]

export const init = () => {
    const con = newEl('div');
    con.append(inputForm(), resultSection());
    app.append(con);
}

const inputForm = () => {
    const c = newEl('div');
    const f = newEl('form', null, 'age-input-form');

    f.addEventListener('submit', (e) => {
        e.preventDefault();
        const res = collectForm(e);
        if (res.success){
            Object.entries(res.data).forEach(([key, value]) => {  calc.setValue(key, value); })
            const age = calc.formatTime(calc.returnCalcDate(), calc.returnCurrentDate());
            Object.entries(age).forEach(([key, value]) => {
                updateAgeElements(key, value);
            })
            console.log('Calculated Age: ', age);
        }
    });

    const dateError = newEl('div', null, 'fullDate-messages');

    const allInputCon = newEl('div');

    inputs.forEach(i => {
        const input = newInput(i);
        allInputCon.append(input);
    });

    const submit = newEl('button', null, 'submit-form');
    submit.type = 'submit';
    submit.innerHTML = icons.submit;

    f.append(allInputCon, dateError, submit);
    c.append(f);
    return c;
}

const newInput = (type) => {
    const c = newEl('div');
    const inputTray = newEl('div');
    const msgTray = newEl('div');
    const inp = newEl('input');
    inp.type = 'text';

    const lab = newEl('label');

    Object.entries(type)
        .forEach(([key, value]) => {
            key === 'day' ? inp.placeholder = '30' : key === 'month' ? inp.placeholder = '8' : inp.placeholder = '2026'
            c.id = `${key}-container`
            inputTray.id = `${key}-tray`;
            msgTray.id = `${key}-messages`;
            lab.textContent = key;
            lab.htmlFor = `${key}-input`;
            inp.name = key;
            inp.id = `${key}-input`;
            inp.maxLength = value.length;
        });

    inputTray.append(lab, inp);
    c.append(inputTray, msgTray);
    return c;
}

const resultSection = () => {
    const c = newEl('div');
    let resultCon = newEl('div');
    ["years", "months", "days"].forEach(res => {
        const results = newEl('span', '--', `${res}-result`);
        const name = newEl('p', res);
        resultCon.append(results, name);
    });
    c.append(resultCon);
    return c;
}