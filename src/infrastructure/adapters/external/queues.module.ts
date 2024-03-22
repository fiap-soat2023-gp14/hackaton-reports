import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from '../../config';
import { MessageHandler } from './MessageConsumer';
import ReportGateway from "../gateway/ReportGateway";
import {IConnection} from "./IConnection";
import {MongoConnection} from "./MongoConnection";

AWS.config.update({
    region: config.AWS_REGION,
});


@Module({
    imports: [
        SqsModule.register({
            consumers: [
                {
                    name: config.AWS_REPORT_QUEUE,
                    queueUrl: config.AWS_REPORT_QUEUE_URL,
                    region: config.AWS_REGION,
                },
            ],
        }),
    ],
    controllers: [],
    providers: [MessageHandler,
        {
            provide: IConnection,
            useClass: MongoConnection,
        },
    ],
    exports: [MessageHandler]
})
export class QueuesModule { }