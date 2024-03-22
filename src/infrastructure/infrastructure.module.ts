import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import ApplicationModule from '../core/application/application.module';
import ReportGateway from './adapters/gateway/ReportGateway';
import PaymentApi from './api/PaymentApi';
import { QueuesModule } from './adapters/external/queues.module';
import {MongoConnection} from "./adapters/external/MongoConnection";
import {IConnection} from "./adapters/external/IConnection";

@Module({
  imports: [ApplicationModule, HttpModule, QueuesModule],
  providers: [ ReportGateway,{
    provide: IConnection,
    useClass: MongoConnection,
  },],
  controllers: [PaymentApi],  
})

export default class InfrastructureModule {}
