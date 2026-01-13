import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Recommend adding ConfigModule
import { SchedulerModule } from './scheduler/scheduler.module';
import { HistoryModule } from './history/history.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    SchedulerModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
