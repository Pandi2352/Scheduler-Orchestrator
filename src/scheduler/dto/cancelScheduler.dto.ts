import { ApiProperty } from '@nestjs/swagger';

export class CancelSchedulerDto {
    @ApiProperty({ description: 'The unique identifier of the task to be canceled' })
    task_id: string;
}
