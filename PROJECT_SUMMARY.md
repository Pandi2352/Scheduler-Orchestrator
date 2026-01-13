# Project Overview: scheduler-orchestrator

## Introduction
`scheduler-orchestrator` is a backend microservice built with **NestJS** and **Fastify**, designed to handle job scheduling and execution. It leverages **Agenda** (backed by MongoDB) to manage task queues and schedule jobs that trigger external webhooks via HTTP POST requests upon execution.

## Technology Stack
- **Framework**: NestJS v11 (Node.js framework)
- **Platform**: Fastify (High-performance web framework adapter)
- **Scheduling Engine**: Agenda v5 (MongoDB-backed job scheduling)
- **Database**: MongoDB (via Agenda)
- **HTTP Client**: Axios (used for executing callbacks)
- **Documentation**: Swagger UI
- **Security**: Helmet

## Core Features
The service exposes REST API endpoints to manage the lifecycle of scheduled tasks. The core mechanism involves defining a job type `orchestrator_cron` which, when triggered, executes a callback to a specified URL.

### Key Functionalities within `AgendaService`:
1.  **One-time Scheduling**: Schedule a task to run once at a specific date/time.
2.  **Daily Scheduling**: Schedule a recurring task to run every day at a specific time (HH:MM).
3.  **Cron Scheduling**: Schedule tasks using standard Cron expressions, with support for:
    - Custom Timezones (default: `Asia/Kolkata`)
    - Start Date and End Date range
4.  **Task Management**:
    - List all scheduled jobs.
    - Fetch job details by ID.
    - Cancel pending jobs.

### Job Execution Logic
- **Job Name**: `orchestrator_cron`
- **Behavior**: When a job is triggered, the service extracts `callback_url` and `data` from the job attributes and sends an HTTP POST request to the `callback_url` with the provided `data`.

## API Endpoints
Base URL: `/scheduler`

### 1. General Scheduling
- **`POST /`**
  - **Summary**: Schedule a one-time task.
  - **Body**: `CreateSchedulerDto` (trigger_time, data, callback_url)

- **`POST /cancel`**
  - **Summary**: Cancel a specific task.
  - **Body**: `CancelSchedulerDto` (task_id)

- **`GET /`**
  - **Summary**: List all scheduled tasks.

- **`GET /:task_id`**
  - **Summary**: Get details of a specific task by its ID.

### 2. Recurrent Scheduling
- **`POST /daily`**
  - **Summary**: Schedule a task to repeat daily at a specific time.
  - **Body**: `RepeatedScheduleDto` (trigger_time as "HH:MM", data, callback_url)

- **`POST /cron`**
  - **Summary**: Schedule a task using a cron expression.
  - **Body**: `CreateCronSchedulerDto` (cron_interval, start_date, end_date, time_zone, data, callback_url)

## Project Structure
- **`src/main.ts`**: Application entry point. Configures Fastify, CORS, Helmet, and Swagger.
- **`src/app.module.ts`**: Root module, imports `SchedulerModule`.
- **`src/scheduler/scheduler.module.ts`**: Encapsulates scheduling logic.
- **`src/scheduler/scheduler.service.ts`**: Logic for initializing Agenda, defining the `orchestrator_cron` job processor, and methods for scheduling/canceling jobs.
- **`src/scheduler/scheduler.controller.ts`**: REST API controller exposing scheduling features at `/scheduler`.
- **`src/scheduler/dto/`**: Data Transfer Objects defining the shape of API requests.

## Configuration
- **Environment Variables** (in `.env`):
  - `MONGO_CONNECTION_STRING`: MongoDB connection URI for Agenda.
  - `CUSTOM_SERVER_PORT`: Port for the application (default: 3000).
  - `AGENDA_COLLECTION`: (Optional) Collection name for Agenda.

## Scripts
- `npm run start`: Run the application.
- `npm run start:dev`: Run in watch mode.
- `npm run build`: Build the application.
- `npm run test`: Run unit tests.
