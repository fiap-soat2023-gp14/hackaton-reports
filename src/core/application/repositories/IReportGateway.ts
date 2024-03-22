import {TimeSheet} from "../../domain/entities/TimeSheet";


export interface IReportGateway {
    find(month: string, year: string): Promise<TimeSheet[]>
}
