# 🔌 Integration Guide: How to use this Scheduler

This **Scheduler Orchestrator** works as a "Webhook Service".
You don't put your business logic *inside* this project. Instead, you tell this project to **call your API** at a specific time.

---

## The Concept

1.  **Your Main App** wants to do something in the future (e.g., "Send an email tomorrow at 9 AM").
2.  **Your Main App** calls the Scheduler: *"Hey, call me back at `https://my-api.com/send-email` tomorrow at 9 AM with this data: `{ userId: 123 }`."*
3.  **SchedulerService** saves this job.
4.  **Tomorrow at 9 AM**, the Scheduler sends a `POST` request to `https://my-api.com/send-email`.
5.  **Your Main App** receives the request and sends the email.

---

## 🚀 Step 1: Prepare YOUR App (The Receiver)

Your application needs a public API endpoint to receive the callback.

**Example (Express.js / NestJS):**

```typescript
// POST /callbacks/send-email
app.post('/callbacks/send-email', (req, res) => {
  const { userId, emailType } = req.body;
  
  console.log(`⏰ Time to send ${emailType} to user ${userId}!`);
  // ... execute your logic here ...

  res.status(200).send('OK');
});
```

---

## 🚀 Step 2: Call the Scheduler (The Sender)

When you want to schedule a task, send a POST request to this Scheduler Service.

### A. One-Time Task
**Endpoint:** `POST https://your-scheduler-url.com/scheduler`

```javascript
import axios from 'axios';

await axios.post('https://your-scheduler-url.com/scheduler', {
  trigger_time: '2025-12-25T08:00:00.000Z', // ISO Date
  callback_url: 'https://my-api.com/callbacks/send-email',
  data: { 
    userId: 123, 
    emailType: 'CHRISTMAS_PROMO' 
  } // This data is passed back to you
});
```

### B. Recurring Task (Cron)
**Endpoint:** `POST https://your-scheduler-url.com/scheduler/cron`

```javascript
await axios.post('https://your-scheduler-url.com/scheduler/cron', {
  cron_interval: '0 9 * * 1', // Every Monday at 9:00 AM
  time_zone: 'Asia/Kolkata',  // (Optional)
  callback_url: 'https://my-api.com/callbacks/weekly-report',
  data: { reportId: 'weekly_summary' }
});
```

### C. Daily Task
**Endpoint:** `POST https://your-scheduler-url.com/scheduler/daily`

```javascript
await axios.post('https://your-scheduler-url.com/scheduler/daily', {
  trigger_time: '14:30', // Run every day at 14:30 (2:30 PM)
  callback_url: 'https://my-api.com/callbacks/daily-cleanup',
  data: { task: 'clean_logs' }
});
```

---

## 💡 Best Practices

1.  **Security**: Verify the callback comes from your scheduler (e.g., share a secret token in the `data` object and check it).
2.  **Idempotency**: Retries might happen. Ensure your endpoint can handle processing the same job twice without breaking things.
3.  **Local Testing**:
    *   If running locally, your `callback_url` cannot be `localhost`.
    *   Use **ngrok** to expose your local app: `ngrok http 3000` -> gets you `https://random-id.ngrok-free.app`.
    *   Use that ngrok URL as your `callback_url`.
