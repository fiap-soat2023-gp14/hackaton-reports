import Moment from 'moment';

export default class DateUtils {
    static generateStart(month: string, year: string): string {
        return `${year}-${month}-01`;
    }

    static generateEnd(month: string, year: string): string {
        var mm = Moment(`${year}-${month}-01`);
        return mm.add(1, 'M').format('YYYY-MM-DD');
    }

    static extractHour(date: string): string {
        var mm = Moment(date);
        return mm.format('HH:mm:ss');
    }

    static extractDate(date: string): string {
        var mm = Moment(date);
        return mm.format('DD/MM/YYYY');
    }
}