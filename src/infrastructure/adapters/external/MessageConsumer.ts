import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from '@aws-sdk/client-sqs';
import { config } from '../../config';
import { ReportRequestDTO } from '../../../core/application/dto/ReportRequestDTO';
import { ReportUseCase } from 'src/core/application/usecase/ReportUseCase';
import {IConnection} from "./IConnection";
import ReportGateway from "../gateway/ReportGateway";



@Injectable()
export class MessageHandler {

    constructor( @Inject(IConnection) private readonly dbConnection: IConnection) { }

    @SqsMessageHandler(config.AWS_REPORT_QUEUE, false)
    async handleMessage(message: AWS.Message) {

        console.log('body', message.Body);
        const data: ReportRequestDTO = JSON.parse(message.Body) as ReportRequestDTO

        console.log('data', data);
        const reportUseCase = new ReportUseCase(new ReportGateway(this.dbConnection));
        await reportUseCase.processReport(data);
    }
}
