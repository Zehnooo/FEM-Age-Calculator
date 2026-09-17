export default {
    day: null,
    month: null,
    year: null,

    setValue(key, value){ this[key] = Number(value); },
    returnCurrentDate(){
        const d = new Date();
        d.setHours(0, 0, 0, 0)
        return d;
        },
    returnCalcDate(){
        return new Date(this.year, this.month - 1, this.day)
    },
    returnAge(given, current){
        let years = current.getFullYear() - given.getFullYear();
        let months = current.getMonth() - given.getMonth();
        let days = current.getDate() - given.getDate();

        if (days < 0) {
            months--;
            const previousMonth = new Date(given.getFullYear(), given.getMonth(),0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            years,
            months,
            days
        };
    }
}