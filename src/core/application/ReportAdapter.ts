import {TimeSheet} from "../domain/entities/TimeSheet";
import {Record, TimeSheetDTO} from "./dto/TimeSheetDTO";
import DateUtils from "../../infrastructure/DateUtils";


export default class ReportAdapter {


    static async toDTO(timeSheetList: TimeSheet[]): Promise<TimeSheetDTO> {
        var recordList = timeSheetList.map(timeSheet => {
            return {
                hour: DateUtils.extractHour(timeSheet.record.toISOString()),
                date: DateUtils.extractDate(timeSheet.record.toISOString()),
                type: timeSheet.type === 'IN' ? 'Entrada' : 'Saida',
            }
        })
        var timeSheetDTO = new TimeSheetDTO();
        timeSheetDTO.employeeId = timeSheetList[0].employeeId;
        timeSheetDTO.totalHours = 0
        var lastRecord = null;
        for (let i = 0; i < timeSheetList.length; i++) {
            const timeSheet = timeSheetList[i];
            if (timeSheet.type === 'IN') {
                lastRecord = timeSheet.record
            } else if (timeSheet.type === 'OUT') {
                if (lastRecord) {
                    const diff =  timeSheet.record.getTime()-lastRecord.getTime();
                    timeSheetDTO.totalHours += diff / (1000 * 60 * 60);
                    lastRecord = null;
                }
            }
        }

        timeSheetDTO.records = recordList;
        return timeSheetDTO;
    }
}
