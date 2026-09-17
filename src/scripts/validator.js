import calc from './calculator.js';

export default {
    day: {
        check(v){
            v = Number(v);
            if (v < 1 || v > 31){ return { success: false, message: 'Invalid day of month' }; }
            return { success: true };
            },
    },
    month: {
        check(v){
            v = Number(v);
            if (v < 1 || v > 12){ return { success: false, message: 'Invalid month' };  }
            return { success: true };
        }
    },
    year: {
        check(v) {
            v = Number(v);
            if (v > calc.returnCurrentDate().getFullYear()){ return { success: false, message: 'Year cannot be in the future' };
            }
            return { success: true };
        },

    },
    fullDate: {
        checkFuture(year, month, date){
            const future = new Date(year, month - 1, date) > calc.returnCurrentDate();
            if (future === true) { return { success: false, message: 'Date cannot be in the future' }; }
            return { success: true };
        },
        checkMonthDays(year, month, date){
            const max = new Date(year, month, 0);
            const invalid = date > max.getDate();
            if (invalid === true) { return { success: false, message: `There are only ${max.getDate()} days in ${max.toLocaleString('en-US', { month: 'long' })}` }; }
            return { success: true };
        }
    },
    middleware: {
        checkNull(v){
            if (!v || v === '') { return { success: false, message: 'Input cannot be blank' }; }
            return { success: true };
        },
        checkNum(v){
            if (isNaN(v)) { return { success: false, message: 'Value must be a numerical value' }; }
            return { success: true };
        },
        checkLength(v, length) {
            if (v.length !== length) { return { success: false, message: `Value must be ${length} digits` }; }
            return { success: true };
        }
    }
}