# Deployment Guide

## Overview

This project is a centralized **Node.js** backend service.

### IMPORTANT NOTE on Hosting
**GitHub Actions is a CI/CD tool, NOT a hosting provider.**
It can build and test your code for free, but it **cannot** keep your server running 24/7 to accept API requests.

To make this API accessible to the internet, you must deploy it to a hosting provider.

### Free Hosting Options
Since you want a free tier, here are the best options for hosting a Node.js App + MongoDB:

| Provider | Free Tier Limits | Database |
| :--- | :--- | :--- |
| **Render** | Free Web Service (spins down after inactivity) | Needs external DB (Atlas) |
| **Railway** | $5 credit/month (Trial) | Included |
| **Fly.io** | Small free allowance | Include SQLite/pg |
| **Vercel** | Serverless Functions (NestJS needs adaptation) | Needs external DB |

## Continuous Integration (GitHub Actions)

We have configured a **GitHub Actions Workflow** (`.github/workflows/ci.yml`) that runs automatically whenever you push code.

### What it does:
1.  **Installs Dependencies**: Ensures `npm install` works.
2.  **Builds the Project**: Checks for compilation errors (`npm run build`).
3.  **Runs Tests**: Executes unit tests (`npm run test`).

This ensures your code is always stable before you deploy it manually to your chosen provider.
