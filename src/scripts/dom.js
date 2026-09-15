import { newEl, collectForm } from './utils.js';
import calc from './calculator.js';
import icons from './icons.js';

const app = document.querySelector('#app');

const inputs = [
    { day: { min: 1, max: 31, length: 2 }},
    { month: { min: 1, max:  12, length: 2 }},
    { year: { min: 0, max: calc.returnCurrentDate().getFullYear(), length: 4 }}
]

export const init = () => {
    const con = newEl('div');
    con.append(inputForm());
    app.append(con);
}

const inputForm = () => {
    const c = newEl('div');
    const f = newEl('form', null, 'age-input-form');

    f.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = collectForm(e);
        console.log(data);
    });

    const inputCon = newEl('div');

    inputs.forEach(i => {
        const input = newInput(i);
        inputCon.append(input);
    });

    const submit = newEl('button', null, 'submit-form');
    submit.type = 'submit';
    submit.innerHTML = icons.submit;

    f.append(inputCon, submit);
    c.append(f);
    return c;
}

const newInput = (type) => {
    const c = newEl('div');
    const inp = newEl('input');
    inp.type = 'text';

    const lab = newEl('label');

    Object.entries(type)
        .forEach(([key, value]) => {
            lab.textContent = key;
            lab.htmlFor = `${key}-input`;
            inp.name = key;
            inp.id = `${key}-input`;
            inp.maxLength = value.length;
        });

    c.append(lab, inp);
    return c;
}