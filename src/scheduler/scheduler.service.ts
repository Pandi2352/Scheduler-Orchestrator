import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { CreateCronSchedulerDto } from './dto/createCronScheduler.dto';
const Agenda = require("agenda");
import { HistoryService } from '../history/history.service';

@Injectable()
export class SchedulerService implements OnModuleInit, OnModuleDestroy {
    private readonly agenda;
    constructor(private readonly historyService: HistoryService) {
        const connection_str = process.env.MONGO_CONNECTION_STRING;
        console.log("connection str is - ", connection_str)
        this.agenda = new Agenda({
            db: {
                address: connection_str
            }
        });
    }
    async onModuleInit() {
        this.defineTasks();
        await this.agenda.start();
    }

    async onModuleDestroy() {
        await this.agenda.stop();
    }

    private defineTasks() {
        this.agenda.define('orchestrator_cron', async (job) => {
            const { callback_url, data } = job.attrs.data;
            const startTime = Date.now();
            try {
                const response = await axios.post(callback_url, data);
                const duration = Date.now() - startTime;
                console.log('Callback triggered successfully');

                await this.historyService.logExecution(
                    job.attrs._id.toString(),
                    job.attrs.name,
                    'SUCCESS',
                    { status: response.status, statusText: response.statusText, data: response.data },
                    duration
                );
            } catch (error) {
                const duration = Date.now() - startTime;
                console.error('Error triggering callback', error);

                await this.historyService.logExecution(
                    job.attrs._id.toString(),
                    job.attrs.name,
                    'FAILED',
                    { message: error.message, stack: error.stack, response: error.response?.data },
                    duration
                );
            }
        });
    }

    public async scheduleTask(triggerTime: Date, data: any, callbackUrl: string) {
        return await this.agenda.schedule(triggerTime, 'orchestrator_cron',
            { callback_url: callbackUrl, data });
    }

    public async cancelTask(taskId: string) {
        const ObjectID = require('mongodb').ObjectID;
        const query = {
            _id: ObjectID(taskId)
        };

        return await this.agenda.cancel(query);
    }

    public async getTaskByTaskId(taskId: string) {
        const ObjectID = require('mongodb').ObjectID;
        const query = {
            _id: ObjectID(taskId)
        };

        const result = await this.agenda.jobs(query);
        if (result?.length > 0) {
            return {
                status: true,
                data: result[0]
            }
        } else {
            return {
                status: false,
                data: {}
            }
        }
    }

    public async listTasks() {
        return await this.agenda.jobs({});
    }

    public async scheduleDailyTaskAt(triggerTime: string, data: any, callbackUrl: string) {
        try {
            // Extract hours and minutes from the triggerTime
            const [hours, minutes] = triggerTime.split(':').map(Number);

            // Create a cron string for the specified time every day
            const cronTime = `${minutes} ${hours} * * *`;  // Example: '30 14 * * *' for 14:30

            // Create a job with the specified data and callback URL
            const job = this.agenda.create('orchestrator_cron', { callback_url: callbackUrl, data });

            job.repeatEvery(cronTime, {
                timezone: 'Asia/Kolkata',
                skipImmediate: false,
            });

            // Save the job
            await job.save();
            return job;
        } catch (error) {
            console.error('Error scheduling repeated task', error);
            throw error;
        }
    }

    public async scheduleCronTasks(cron_schedule_dto: CreateCronSchedulerDto, data: any, callbackUrl: string) {
        try {


            // Create a cron string for the specified time every day
            const cronTime = cron_schedule_dto.cron_interval;  // Example: '30 14 * * *' for 14:30
            let time_zone = 'Asia/Kolkata';

            if (cron_schedule_dto.time_zone) {
                time_zone = cron_schedule_dto.time_zone
            }

            // Create a job with the specified data and callback URL
            const job = this.agenda.create('orchestrator_cron', { callback_url: callbackUrl, data });

            job.repeatEvery(cronTime, {
                timezone: time_zone,
                skipImmediate: false,
                startDate: new Date(cron_schedule_dto.start_date),
                endDate: new Date(cron_schedule_dto.end_date),
                cron: true
            });

            // Save the job
            await job.save();
            return job;
        } catch (error) {
            console.error('Error scheduling repeated task', error);
            throw error;
        }
    }
}

