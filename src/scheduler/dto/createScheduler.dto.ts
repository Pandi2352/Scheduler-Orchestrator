import { ApiProperty } from '@nestjs/swagger';

export class CreateSchedulerDto {
    @ApiProperty({ description: 'The time at which the task should be triggered' })
    trigger_time: string;

    @ApiProperty({ description: 'The data to be sent when the task is triggered' })
    data: any;

    @ApiProperty({ description: 'The callback URL to be called when the task is triggered' })
    callback_url: string;
}
