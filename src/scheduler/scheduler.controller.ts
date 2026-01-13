import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchedulerService } from './scheduler.service';
import { RepeatedScheduleDto } from './dto/RepeatedScheduleDto';
import { CancelSchedulerDto } from './dto/cancelScheduler.dto';
import { CreateSchedulerDto } from './dto/createScheduler.dto';
import { ScheduledTaskDto } from './dto/scheduledTask.dto';
import { CreateSchedulerResponseDto } from './dto/schedulerResponse.dto';
import { CreateCronSchedulerDto } from './dto/createCronScheduler.dto';

@Controller('scheduler')
@ApiTags('Scheduler')
export class SchedulerController {
    constructor(private readonly schedulerService: SchedulerService) { }

    @Post()
    @ApiOperation({ summary: 'Schedule a new task' })
    @ApiBody({ type: CreateSchedulerDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Task scheduled successfully',
        type: CreateSchedulerResponseDto
    })
    async scheduleTask(@Body() body: CreateSchedulerDto) {
        const triggerTime = new Date(body.trigger_time);
        const job = await this.schedulerService.scheduleTask(triggerTime, body.data, body.callback_url);
        return { jobId: job.attrs._id };
    }

    @Post('cancel')
    @ApiOperation({ summary: 'Cancel a scheduled task' })
    @ApiBody({ type: CancelSchedulerDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task canceled successfully',
        schema: {
            properties: {
                canceled: { type: 'boolean' }
            }
        }
    })
    async cancelTask(@Body() body: CancelSchedulerDto) {
        const result = await this.schedulerService.cancelTask(body.task_id);
        return { canceled: result };
    }

    @Get('/:task_id')
    @ApiOperation({ summary: 'Cancel a scheduled task' })
    @ApiBody({ type: CancelSchedulerDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get Task by task ID canceled successfully',
    })
    async getTaskByTaskId(@Param('task_id') task_id: string) {
        const result = await this.schedulerService.getTaskByTaskId(task_id);
        return { data: result };
    }

    @Get()
    @ApiOperation({ summary: 'List all scheduled tasks' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of scheduled tasks',
        type: ScheduledTaskDto
    })
    async listTasks() {
        const tasks = await this.schedulerService.listTasks();
        return tasks.map((task) => ({
            id: task.attrs._id,
            name: task.attrs.name,
            nextRunAt: task.attrs.nextRunAt,
            data: task.attrs.data,
        }));
    }

    @Post('daily')
    @ApiOperation({ summary: 'Schedule a task with a repeat time' })
    @ApiBody({ type: RepeatedScheduleDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task scheduled with repeat time',
        type: RepeatedScheduleDto
    })
    async scheduleDailyTaskAt(@Body() body: RepeatedScheduleDto) {
        const triggerTime: string = body.trigger_time.toString();
        const job = await this.schedulerService.scheduleDailyTaskAt(triggerTime, body.data, body.callback_url);
        return { jobId: job.attrs._id };
    }

    @Post('cron')
    @ApiOperation({ summary: 'Schedule a task with a cron interval' })
    @ApiBody({ type: CreateCronSchedulerDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task scheduled with Cron interval',
        type: CreateCronSchedulerDto
    })
    async scheduleCronTasks(@Body() body: CreateCronSchedulerDto) {

        const job = await this.schedulerService.scheduleCronTasks(body, body.data, body.callback_url);
        return { jobId: job.attrs._id };
    }
}
