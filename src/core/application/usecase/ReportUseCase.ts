import { TimeSheet } from '../../domain/entities/TimeSheet';
import ReportGateway from "../../../infrastructure/adapters/gateway/ReportGateway";
import {ReportRequestDTO} from "../dto/ReportRequestDTO";
import ReportAdapter from "../ReportAdapter";
import {ReportSendEmail} from "../../../infrastructure/adapters/external/ReportSendEmail";


export class ReportUseCase {

  constructor(  private reportGateway: ReportGateway) { }

  public async processReport(
      reportRequest: ReportRequestDTO
  ): Promise<void > {
    console.log('Start Process Report request: ');
    var timeSheetList = await this.reportGateway.find(reportRequest);


    console.log('Registros encontrados: ', timeSheetList.length);
    if(timeSheetList.length > 0){
    
      const timeSheetDTO = await ReportAdapter.toDTO(timeSheetList);

      ReportSendEmail.sendEmail(reportRequest.email, timeSheetDTO);

    }else{
      console.log('Nenhum registro encontrado');
    }
     return Promise.resolve();
  }
}
