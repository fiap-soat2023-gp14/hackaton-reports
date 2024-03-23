import { TimeSheet } from '../../domain/entities/TimeSheet';
import ReportGateway from "../../../infrastructure/adapters/gateway/ReportGateway";
import {ReportRequestDTO} from "../dto/ReportRequestDTO";
import ReportAdapter from "../ReportAdapter";
import {ReportSendEmail} from "../../../infrastructure/adapters/external/ReportSendEmail";


export class ReportUseCase {

  constructor(  private reportGateway: ReportGateway) { }

  public async processReport(
      reportRequest: ReportRequestDTO
  ): Promise<TimeSheet[]> {
    var timeSheetList = await this.reportGateway.find(reportRequest);

    const timeSheetDTO = await ReportAdapter.toDTO(timeSheetList);

    ReportSendEmail.sendEmail(reportRequest.email,timeSheetDTO);

    return Promise.resolve(timeSheetList);
  }
}
