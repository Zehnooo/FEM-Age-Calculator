import validate from './validator.js';
import {applyStatusClass, showMessage} from './domUpdates.js';

export const newEl = (type, text = null, id = null, classes = []) => {
    const e = document.createElement(type);
    if (text){ e.textContent = text; }
    if (id){ e.id = id; }
    if (classes.length > 0) { classes.forEach(cl => e.classList.add(cl)); }
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


    Object.keys(results).forEach(key => {

        if (!results[key].errors.length){
            applyStatusClass(key, true);
        }

        if (results[key].errors.length){
            results[key].errors.forEach(err => {
                showMessage(key, err);
                errCount++;
            });
        }

    });

    const isValidInputs = Object.values(results).every( result => result.errors.length === 0 );
    if (isValidInputs) { results.fullDate = (validation([year, month, day], 'full-date')); }

    const pass = Object.values(results).every( value => value.errors.length === 0 );

    return pass ? { success: true, data: {year, month, day} } : { success: false, errorCount: errCount }
}

const validation = (value, type) => {
    const errors = [];
    const success = [];
    let isNull, isValid, isFuture, isDayNumInvalid;
    let year, month, day;

    if (Array.isArray(value)) { [year, month, day] = value; }

    switch(type){
        case 'day':
            isNull = validate.middleware.checkNull(value);
            if (isNull.success) { isValid = validate.day.check(value); }
            break;
        case 'month':
            isNull = validate.middleware.checkNull(value);
            if (isNull.success) { isValid = validate.month.check(value); }
            break;
        case 'year':
            isNull = validate.middleware.checkNull(value);
            if (isNull.success) { isValid = validate.year.check(value); }
            break;
        case 'full-date':
            isFuture = validate.fullDate.checkFuture(year, month, day);
            if (isFuture.success) { isDayNumInvalid = validate.fullDate.checkMonthDays(year, month, day); }
    }

    [isNull, isValid, isFuture, isDayNumInvalid].forEach(x => {
        if (x !== undefined && x.success === false){ x.type = type; errors.push(x); }
        if (x !== undefined && x.success){ x.type = type; success.push(x); }
    });

    return { errors, success } || null;
}