# Deploying Scheduler Orchestrator to Render

This guide will help you deploy the **Scheduler Orchestrator** to [Render.com](https://render.com), a popular cloud platform for hosting web services.

## Prerequisites

1.  **GitHub / GitLab Account**: push your code to a repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **MongoDB Database**: You need a hosted MongoDB instance. The easiest (and free) option is **MongoDB Atlas**.

---

## Step 1: Push Code to GitHub

Ensure your project is initialized as a git repository and pushed to GitHub.

```bash
git init
git add .
git commit -m "Initial commit"
# Replace with your repo URL
git remote add origin https://github.com/your-username/scheduler-orchestrator.git
git push -u origin master
```

## Step 2: Create a MongoDB Database (MongoDB Atlas)

1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a free **Shared Cluster**.
3.  Create a **Database User** (username/password).
4.  In **Network Access**, allow access from anywhere (`0.0.0.0/0`) OR specific IP ranges (Render doesn't provide static IPs on free tiers easily, so `0.0.0.0/0` is common for dev/personal projects, otherwise use peering).
5.  Get your **Connection String**. It looks like:
    `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/scheduler-db?retryWrites=true&w=majority`

## Step 3: Deploy on Render

### Option A: Manual Setup (Easiest)

1.  Go to your Render Dashboard and click **New +**.
2.  Select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `scheduler-orchestrator`
    *   **Environment**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm run start:prod`
5.  Scroll down to **Environment Variables** and add:
    *   Key: `MONGO_CONNECTION_STRING`
    *   Value: *(Your MongoDB Atlas connection string from Step 2)*
6.  Click **Create Web Service**.

### Option B: Blueprint (Infrastructure as Code)

1.  In the Render Dashboard, go to **Blueprints**.
2.  Click **New Blueprint Instance**.
3.  Connect your repo.
4.  Render will detect the `render.yaml` file in your project root.
5.  It will ask you to provide values for the environment variables defined in the yaml (specifically `MONGO_CONNECTION_STRING`).
6.  Click **Apply**.

## Verification

Once deployed, Render will give you a URL (e.g., `https://scheduler-orchestrator.onrender.com`).

1.  **Dashboard**: Visit `https://scheduler-orchestrator.onrender.com/` to see your UI.
2.  **API Docs**: Visit `https://scheduler-orchestrator.onrender.com/api` to see Swagger.
3.  **Health Check**: Validating the service is up.

## Troubleshooting

-   **Error: `connection refused` / MongoDB Connection Error**: Check if your MongoDB Atlas Network Access allows connections from `0.0.0.0/0`.
-   **Build Failures**: Check the logs in the Render dashboard. Ensure `package.json` scripts are correct.
