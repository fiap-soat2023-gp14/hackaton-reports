import { Injectable } from '@nestjs/common';
import {IReportGateway} from "../../../core/application/repositories/IReportGateway";
import {IConnection} from "../external/IConnection";
import * as querystring from "querystring";
import {TimeSheet} from "../../../core/domain/entities/TimeSheet";
import DateUtils from "../../DateUtils";


export default class ReportGateway implements IReportGateway {
    COLLECTION_NAME = 'TimeSheet';
    private dbConnection: IConnection;
    constructor(database: IConnection) {
        this.dbConnection = database;
    }

    async find(month: string, year: string): Promise<TimeSheet[]> {

        const query = {
            "record": {
                $gte:  new Date(DateUtils.generateStart(month, year)), $lt: new Date(DateUtils.generateEnd(Number(month), Number(year)))
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
