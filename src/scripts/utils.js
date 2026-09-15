import validate from './validator.js';

export const newEl = (type, text = null, id = null, classes = []) => {
    const e = document.createElement(type);
    if (text){ e.textContent = text; }
    if (id){ e.id = id; }
    if (classes.length > 0) { classes.forEach(cl => e.classList.add(cl)); }
    return e;
}

export const collectForm = (e) => {
    const data = new FormData(e.target);

    const day = data.get('day');

    const isDayNull = validate.middleware.checkNull(day);
    const isDayValid = validate.day.check(day);
    console.log({isDayNull, isDayValid});

    const month = data.get('month');

    const year = data.get('year');

    return {day, month, year}
}