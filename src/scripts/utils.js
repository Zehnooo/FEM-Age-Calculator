import validate from './validator.js';
import {applyStatusClass, resetAgeElements, showMessage} from './domUpdates.js';

export const newEl = (type, text = null, id = null, classes = []) => {
    const e = document.createElement(type);
    if (text){ e.textContent = text; }
    if (id){ e.id = id; }
    if (classes.length > 0){ classes.forEach(cl => e.classList.add(cl)); }
    return e;
}

export const collectForm = (e) => {
    let errCount = 0;
    const results = {};
    const data = new FormData(e.target);

    const day = data.get('day');
    const month = data.get('month');
    const year = data.get('year');

    results.day = (validation(day, 'day'));
    results.month = (validation(month, 'month'));
    results.year = (validation(year, 'year'));

    document.querySelector('#fullDate-messages').replaceChildren();
    resetAgeElements();
    Object.keys(results).forEach(key => {
        document.querySelector(`#${key}-messages`).replaceChildren();
        if (results[key] === null){ applyStatusClass(key, true); }
        if (results[key]?.errors?.length){
            results[key].errors.forEach(err => {
                showMessage(key, err);
                applyStatusClass(key, false);
                errCount++;
            });
        }
    });

    const isValidInputs = Object.values(results).every( result => result === null );
    if (isValidInputs) {
        document.querySelector('#fullDate-messages').replaceChildren();
        results.fullDate = (validation([year, month, day], 'fullDate'));
        if (results?.fullDate?.errors?.length){
            results?.fullDate?.errors?.forEach(err => { showMessage('fullDate', err); errCount++; });
        }
    }

    const pass = Object.values(results).every( value => value === null );
    return pass ? { success: true, data: {year, month, day} } : { success: false, errorCount: errCount }
}

const validation = (value, type) => {
    const errors = [];

    let isNull, isNum, isValid, isFuture, isDayNumInvalid, isValidLength;
    let year, month, day;

    if (Array.isArray(value)) { [year, month, day] = value; }

    if (type === 'day' || type  === 'month' || type === 'year'){
        let length = type === 'year' ? 4 : 2;

        isNull = validate.middleware.checkNull(value);
            if (!isNull.success) { errors.push(isNull); return { errors }; }

        isNum = validate.middleware.checkNum(value);
            if (!isNum.success) { errors.push(isNum); return { errors }; }

        isValidLength = validate.middleware.checkLength(value, length);
            if (!isValidLength.success) { errors.push(isValidLength); return { errors } }

        isValid = validate[type].check(value);
            if (!isValid.success) { errors.push(isValid); return { errors }; }
    }

    if (type === 'fullDate') {
        isFuture = validate.fullDate.checkFuture(year, month, day);
            if (!isFuture.success) { errors.push(isFuture); return { errors }; }
        isDayNumInvalid = validate.fullDate.checkMonthDays(year, month, day);
            if (!isDayNumInvalid.success) { errors.push(isDayNumInvalid); return { errors }; }
    }

    return null;
}