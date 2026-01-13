import { ApiProperty } from '@nestjs/swagger';

export class CreateCronSchedulerDto {

    // @ApiProperty({ description: 'The name of the cron job' })
    // cron_name: string;

    @ApiProperty({ description: 'The time at which the task should be triggered' })
    cron_interval: string;

    @ApiProperty({ description: 'The start_date to be sent when the task is triggered' })
    start_date: any;

    @ApiProperty({ description: 'The end_date to stopped the trigger' })
    end_date: any;

    @ApiProperty({ description: 'The data to be sent when the task is triggered' })
    data: any;

    @ApiProperty({ description: 'The time zone to be sent when the task is triggered' })
    time_zone: any;

    @ApiProperty({ description: 'The callback URL to be called when the task is triggered' })
    callback_url: string;
}
