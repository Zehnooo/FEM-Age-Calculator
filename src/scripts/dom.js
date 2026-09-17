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
    const con = newEl('div', null, 'content', ['w', 'p1']);
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
            Object.entries(res.data).forEach(([key, value]) => {  calc.setValue(key, value); });
            const age = calc.returnAge(calc.returnCalcDate(), calc.returnCurrentDate());
            Object.entries(age).forEach(([key, value]) => { updateAgeElements(key, value); });
        }
    });

    const dateError = newEl('div', null, 'fullDate-messages');

    const allInputCon = newEl('div', null, null, ['fx', 'start', 'gp1']);

    inputs.forEach(i => {
        const input = newInput(i);
        allInputCon.append(input);
    });


    const submitCon = newEl('div', null, 'submit-con', ['fx', 'ac']);
    const line = newEl('hr', null, null, ['hr',  'w']);
    const submit = newEl('button', null, 'submit-form',  ['btn', 'bgt', 'p06', 'br50']);
    submit.type = 'submit';
    submit.innerHTML = icons.submit;

    submitCon.append(line, submit);
    f.append(allInputCon, dateError, submitCon);
    c.append(f);
    return c;
}

const newInput = (type) => {
    const c = newEl('div');
    const inputTray = newEl('div', null, null, ['inp-tray', 'fx', 'fdc']);
    const msgTray = newEl('div');
    const inp = newEl('input', null, null, ['inp', 'wa', 'br04', 'p04']);
    inp.type = 'text';
    inp.required = true;

    const lab = newEl('label', null, null, ['fw700']);

    Object.entries(type)
        .forEach(([key, value]) => {
            switch(key){
                case 'day':
                    inp.placeholder = 'DD';
                    break;
                case 'month':
                    inp.placeholder = 'MM';
                    break;
                case 'year':
                    inp.placeholder = 'YYYY';

                    break;
            }
            c.id = `${key}-container`
            inputTray.id = `${key}-tray`;
            msgTray.id = `${key}-messages`;
            lab.textContent = key;
            lab.htmlFor = `${key}-input`;
            inp.name = key;
            inp.id = `${key}-input`;
            inp.maxLength = value.length;
            inp.minLength = value.length;
        });

    inputTray.append(lab, inp);
    c.append(inputTray, msgTray);
    return c;
}

const resultSection = () => {
    const c = newEl('div');
    let resultCon = newEl('div');
    ["years", "months", "days"].forEach(res => {
        const con = newEl('div', null, null, ['fx', 'wa', 'ac', 'gp04']);
        const results = newEl('span', '--', `${res}-result`);
        const name = newEl('p', res);
        con.append(results, name);
        resultCon.append(con);
    });
    c.append(resultCon);
    return c;
}