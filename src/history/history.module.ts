
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { JobHistory, JobHistorySchema } from './schemas/job-history.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JobHistory.name, schema: JobHistorySchema }]),
    ],
    controllers: [HistoryController],
    providers: [HistoryService],
    exports: [HistoryService],
})
export class HistoryModule { }
