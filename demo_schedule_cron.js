const axios = require('axios');

// 1. The URL of your LIVE Scheduler (on Koyeb)
const SCHEDULER_API = 'https://linguistic-eolanda-bose-10558853.koyeb.app/scheduler/cron';

// 2. The API you want to hit every minute (Using a public test API for demonstration)
// In a real app, this would be YOUR server, e.g., 'https://my-backend.com/api/cron-handler'
const TARGET_API_TO_HIT = 'https://jsonplaceholder.typicode.com/posts'; 

async function scheduleDemoTask() {
  console.log('🚀 Sending request to Scheduler...');

  try {
    const response = await axios.post(SCHEDULER_API, {
      // 3. Define the Cron Expression: "* * * * *" means "Every Minute"
      cron_interval: '* * * * *', 
      
      // 4. Where should the scheduler send the POST request?
      callback_url: TARGET_API_TO_HIT,

      // 5. Data to send to the target API
      data: {
        message: 'Hello from the Scheduler!',
        timestamp: new Date().toISOString(),
        source: 'Demo Script'
      },
      
      // 6. Optional: Timezone
      time_zone: 'Asia/Kolkata'
    });

    console.log('✅ Success! Job Scheduled.');
    console.log('Job ID:', response.data.jobId);
    console.log('The scheduler will now hit', TARGET_API_TO_HIT, 'every minute.');
    
  } catch (error) {
    console.error('❌ Error scheduling task:');
    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
    } else {
        console.error(error.message);
    }
  }
}

scheduleDemoTask();
