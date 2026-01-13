# 🚀 Free Deployment Guide: Koyeb + GitHub Actions

This guide explains how to deploy your **Scheduler Orchestrator** using **Koyeb** (Hosting) and **GitHub Actions** (CI/CD).

## Overview

1.  **GitHub Actions**: Builds your code into a Docker image and pushes it to the **GitHub Container Registry (GHCR)** automatically on every push.
2.  **Koyeb**: Pulls that Docker image and runs it.

---

## Step 1: Prepare the Repository

We have already added the necessary files:
1.  `Dockerfile`: Instructions to build your app.
2.  `.github/workflows/deploy-koyeb.yml`: The automation script.

**👉 Action Required:**
Push these changes to your GitHub repository before proceeding!

```bash
git add .
git commit -m "Setup Koyeb deployment"
git push origin main
```

Once pushed, go to your Repository's **Actions** tab on GitHub. You should see a workflow named "Build and Push to GHCR" running. Wait for it to turn ✅ Green.

---

## Step 2: Configure Koyeb

1.  **[Sign up for Koyeb](https://app.koyeb.com/auth/signup)** (Free Tier available).
2.  **Create a New App**:
    -   Click **Create App**.
    -   Select **Docker** as the deployment method (not GitHub). *Why? Because we are using our custom GitHub Action to build the image properly.*
3.  **Image Configuration**:
    -   **Docker Image**: `ghcr.io/YOUR_GITHUB_USERNAME/repos-name:latest`
        -   *Replace `YOUR_GITHUB_USERNAME` with your actual username.* 
        -   *Replace `repos-name` with your actual repository name (in lowercase).*
        -   *Example*: `ghcr.io/pandi2352/cron-job:latest`
    -   **Private Registry?**: If your repo is private, you will need to add a "Registry Secret" in Koyeb settings using a GitHub Personal Access Token (PAT). If public, it just works.
4.  **Builder Configuration**:
    -   Skip (since we are providing a pre-built Docker image).
5.  **Environment Variables**:
    -   Add the following keys:
        -   `MONGO_CONNECTION_STRING`: `your_mongodb_connection_string` (from Atlas)
        -   `PORT`: `8000` (Koyeb exposes port 8000 by default, or set it to 3000 match your app).
            -   *Tip: It is best to set `PORT=8000` here and let the app listen on it.*
6.  **Instance Type**: Select **Eco** (Free) or Micro.
7.  **Deploy**: Click **Deploy**.

---

## Step 3: Automate Updates (Optional)

By default, Koyeb will pull the `latest` image when you click deploy. To make it **auto-deploy** when GitHub Actions finishes:

1.  Go to your Koyeb Service Settings.
2.  Enabled **Auto-deploy** if using the GitHub integration, OR...
3.  Since we are using GHCR:
    -   Koyeb checks for new image digests periodically.
    -   **For instant updates**: You can add a step to the GitHub Action to trigger a Koyeb redeploy using their CLI, but usually, the standard poll is sufficient for free tier usage.

---

## Step 4: Verify

Visit your Koyeb App URL (e.g., `https://scheduler-xyz.koyeb.app/scheduler`). You should see the list of tasks (empty array `[]`).

## Note on Database

Ensure you are still using **MongoDB Atlas** as the database.
-   Access MongoDB Atlas.
-   Network Access: Whitelist `0.0.0.0/0` (Allow Anywhere) so Koyeb can connect.
