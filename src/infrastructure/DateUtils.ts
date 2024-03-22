export default class DateUtils {
    static generateStart(month: string, year: string): string {
        return `${year}-${month}-01`;
    }

    static generateEnd(month: number, year: number): string {
        return `${year}-${month+1}-1`;
    }

    static extractHour(date: string): string {
        return date.split('T')[1].split('.')[0];
    }

    static extractDate(date: string): string {
        return date.split('T')[0];
    }
}