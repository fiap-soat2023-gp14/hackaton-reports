import { Injectable } from '@nestjs/common';
import { IReportGateway } from "../../../core/application/repositories/IReportGateway";
import { IConnection } from "../external/IConnection";
import * as querystring from "querystring";
import { TimeSheet } from "../../../core/domain/entities/TimeSheet";
import DateUtils from "../../DateUtils";


export default class ReportGateway implements IReportGateway {
    COLLECTION_NAME = 'TimeRecords';
    private dbConnection: IConnection;
    constructor(database: IConnection) {
        this.dbConnection = database;
    }

    async find(reportRequest): Promise<TimeSheet[]> {

        const query = {
            "employeeId": reportRequest.employeeId,
            "record": {
                $gte: DateUtils.generateStart(reportRequest.month, reportRequest.year), 
                $lt: DateUtils.generateEnd(reportRequest.month, reportRequest.year)
            }
        }

        console.log('query', query);
        const timeSheetList: Array<TimeSheet> = await this.dbConnection
            .getCollection(this.COLLECTION_NAME)
            .find(query)
            .toArray();

        return Promise.resolve(timeSheetList);
    }
}
