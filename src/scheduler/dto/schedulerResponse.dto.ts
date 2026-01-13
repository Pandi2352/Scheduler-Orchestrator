import { ApiProperty } from '@nestjs/swagger';

export class CreateSchedulerResponseDto {
    @ApiProperty({ description: 'The unique identifier of the newly scheduled task' })
    jobId: string;
}
