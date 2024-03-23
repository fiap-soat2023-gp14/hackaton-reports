import {TimeSheet} from "../../domain/entities/TimeSheet";
import { ReportRequestDTO } from "../dto/ReportRequestDTO";


export interface IReportGateway {
    find(reportRequest: ReportRequestDTO): Promise<TimeSheet[]>
}
