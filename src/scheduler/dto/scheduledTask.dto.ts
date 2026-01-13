import { ApiProperty } from '@nestjs/swagger';

export class ScheduledTaskDto {
    @ApiProperty({ type: String, description: 'The unique identifier of the task' })
    id: string;

    @ApiProperty({ type: String, description: 'The name of the task' })
    name: string;

    @ApiProperty({ type: String, format: 'date-time', description: 'The next scheduled run time of the task' })
    nextRunAt: string;

    @ApiProperty({ type: Object, description: 'The data associated with the task' })
    data: any;
}
