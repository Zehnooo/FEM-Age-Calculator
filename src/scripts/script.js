console.log('init');
import calc from './calculator.js';

calc.setValue("day", "15");
calc.setValue("month", "9");
calc.setValue("year", "2026");

console.log(calc.formatTime(calc.returnCalcDate(), calc.returnCurrentDate()));