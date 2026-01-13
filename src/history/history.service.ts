
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobHistory, JobHistoryDocument } from './schemas/job-history.schema';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(JobHistory.name) private historyModel: Model<JobHistoryDocument>,
    ) { }

    async logExecution(
        jobId: string,
        name: string,
        status: 'SUCCESS' | 'FAILED',
        response: any,
        duration: number,
    ) {
        const executedAt = new Date();
        const log = new this.historyModel({
            jobId,
            name,
            status,
            response,
            executedAt,
            duration,
        });
        return log.save();
    }

    async getAllHistory() {
        return this.historyModel.find().sort({ executedAt: -1 }).limit(100).exec();
    }
}
