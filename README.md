
<div align="center">

  <img src="https://img.icons8.com/nolan/96/time-machine.png" alt="logo" width="100" height="auto" />
  <h1>Scheduler Orchestrator</h1>
  
  <p>
    A high-performance, resilient job orchestration microservice built with 
    <b>NestJS</b>, <b>Fastify</b>, and <b>Agenda</b>.
  </p>

  <p>
    <a href="https://nestjs.com" target="_blank">
      <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
    </a>
    <a href="https://www.mongodb.com/" target="_blank">
      <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
    </a>
    <a href="https://github.com/agenda/agenda" target="_blank">
      <img src="https://img.shields.io/badge/Agenda-333333?style=for-the-badge&logo=github&logoColor=white" alt="Agenda">
    </a>
    <a href="https://www.fastify.io/" target="_blank">
        <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
    </a>
  </p>
  
  <h3>
    <a href="https://linguistic-eolanda-bose-10558853.koyeb.app/api" target="_blank">🔗 Live Demo (Swagger UI)</a>
  </h3>
</div>

---

## 🚀 Overview

**Scheduler Orchestrator** is a robust microservice designed to handle complex job scheduling needs. Whether you need to run a task once, repeat it daily, or execute it based on a complex Cron expression, this service handles it all with persistence and reliability backed by MongoDB.

Upon execution, tasks trigger external **Webhooks** (HTTP POST callbacks), allowing you to decouple your scheduling logic from your business logic completely.

## ✨ Features

- 📅 **Flexible Scheduling**:
  - **One-time**: Run a task at a specific `Date`.
  - **Daily**: Execute tasks every day at a set time (e.g., `14:30`).
  - **Cron**: Full cron expression support with start/end dates and timezones (default: `Asia/Kolkata`).
- 🔗 **Webhook Integration**: Automatically POSTs data to your specified `callback_url` when a job runs.
- 🛡️ **Reliable & Persistent**: Jobs are stored in MongoDB, ensuring no tasks are lost even if the server restarts.
- ⚡ **High Performance**: Built on Fastify for low overhead and high throughput.
- 📑 **Swagger API**: Interactive API documentation available out-of-the-box.

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [NestJS](https://nestjs.com/) | A progressive Node.js framework for building efficient server-side applications. |
| **Platform** | [Fastify](https://www.fastify.io/) | High-performance and low-overhead web framework adapter. |
| **Scheduler** | [Agenda](https://github.com/agenda/agenda) | Lightweight job scheduling for Node.js backed by MongoDB. |
| **Database** | [MongoDB](https://www.mongodb.com/) | NoSQL database for storing job definitions and persistence. |
| **Docs** | [Swagger](https://swagger.io/) | Automated API documentation generator. |

## 📂 Project Structure

```bash
/
├── .env                  # Environment configuration
├── src/
│   ├── app.module.ts     # Root module
│   ├── main.ts           # Application entry point
│   └── scheduler/        # 🧠 Core Scheduler Domain
│       ├── dto/          # Data Transfer Objects
│       ├── scheduler.controller.ts  # API Routes
│       └── scheduler.service.ts     # Job Logic & Agenda Definition
└── test/
```


## ⚡ CI/CD

This project uses **GitHub Actions** for continuous integration. Every push to `main` triggers a workflow that installs dependencies, builds the project, and runs tests to ensure stability.

[![CI Status](https://github.com/Pandi2352/Scheduler-Orchestrator/actions/workflows/ci.yml/badge.svg)](https://github.com/Pandi2352/Scheduler-Orchestrator/actions)

## 🔌 API Endpoints

The service exposes a RESTful API under the base path `/scheduler`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/scheduler` | Schedule a **one-time** task. |
| `POST` | `/scheduler/daily` | Schedule a **daily recurring** task. |
| `POST` | `/scheduler/cron` | Schedule a task using a **Cron expression**. |
| `POST` | `/scheduler/cancel` | **Cancel** a pending task by ID. |
| `GET` | `/scheduler` | **List** all currently scheduled tasks. |
| `GET` | `/scheduler/:task_id` | **Get details** of a specific task. |

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (Running instance or connection string)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/scheduler-orchestrator.git
    cd scheduler-orchestrator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    MONGO_CONNECTION_STRING=mongodb://localhost:27017/scheduler-db
    CUSTOM_SERVER_PORT=3000
    ```

4.  **Run the application:**
    ```bash
    # Development
    npm run start:dev

    # Production
    npm run start:prod
    ```

5.  **Explore the API:**
    Visit **[Live Swagger UI](https://linguistic-eolanda-bose-10558853.koyeb.app/api)** or `http://localhost:3000/api` (Local) to see the Swagger documentation.

## 📄 License

This project is [MIT licensed](LICENSE).

<div align="center">
  <sub>Built with ❤️ by the AI Kit Team</sub>
</div>
