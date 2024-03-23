import {TimeSheet} from "../domain/entities/TimeSheet";
import {Record, TimeSheetDTO} from "./dto/TimeSheetDTO";
import DateUtils from "../../infrastructure/DateUtils";
import Moment from 'moment';


export default class ReportAdapter {


    static async toDTO(timeSheetList: TimeSheet[]): Promise<TimeSheetDTO> {
        var recordList = timeSheetList.map(timeSheet => {
            return {
                hour: DateUtils.extractHour(timeSheet.record),
                date: DateUtils.extractDate(timeSheet.record),
                type: timeSheet.type === 'IN' ? 'Entrada' : 'Saida',
            }
        })
        
        var timeSheetDTO = new TimeSheetDTO();
        timeSheetDTO.employeeId = timeSheetList[0].employeeId;
        
        var lastRecord = null;
        var totalMinutes = 0;
        for (let i = 0; i < timeSheetList.length; i++) {
            const timeSheet = timeSheetList[i];
            if (timeSheet.type === 'IN') {
                lastRecord = timeSheet.record
            } else if (timeSheet.type === 'OUT') {
                if (lastRecord) {
                    const momentIn = Moment(lastRecord);
                    const momentOut = Moment(timeSheet.record);
                    const diff =  momentOut.diff(momentIn, 'minutes');
                    totalMinutes += Number(diff);

                    lastRecord = null;
                }   
            }
        }
        let horas = Math.floor(totalMinutes / 60);
        let minutos = totalMinutes - (horas * 60);
        timeSheetDTO.totalHours =`${horas} horas e ${minutos} minutos`
      
       
        timeSheetDTO.records = recordList;
        return timeSheetDTO;
    }
}
