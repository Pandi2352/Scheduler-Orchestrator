
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobHistoryDocument = JobHistory & Document;

@Schema({ timestamps: true })
export class JobHistory {
    @Prop({ required: true })
    jobId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    status: 'SUCCESS' | 'FAILED';

    @Prop({ type: Object })
    response: any; // Store error details or response data

    @Prop()
    executedAt: Date;

    @Prop()
    duration: number; // in ms
}

export const JobHistorySchema = SchemaFactory.createForClass(JobHistory);
