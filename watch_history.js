const axios = require('axios');

// LIVE Server URL
const HISTORY_API = 'https://linguistic-eolanda-bose-10558853.koyeb.app/history';

let lastSeenTime = null;

async function watchHistory() {
  console.clear();
  console.log('👀 Watching Job History... (Polling every 10s)');
  console.log('------------------------------------------------');

  try {
    // Fetch last 20 logs
    const response = await axios.get(HISTORY_API);
    const logs = response.data;

    // Filter for new logs if we have a lastSeenTime
    const newLogs = logs.filter(log => {
      if (!lastSeenTime) return true;
      return new Date(log.executedAt) > new Date(lastSeenTime);
    });

    if (newLogs.length > 0) {
      // Update last seen time to the most recent log
      lastSeenTime = newLogs[0].executedAt;

      // Print new logs (reverse to show oldest first in this batch)
      [...newLogs].reverse().forEach(log => {
        const time = new Date(log.executedAt).toLocaleTimeString();
        const statusIcon = log.status === 'SUCCESS' ? '✅' : '❌';
        console.log(`[${time}] ${statusIcon} Job: ${log.name} | Duration: ${log.duration}ms`);
        // console.log(log.response); // Uncomment if you want full details
      });
    } else {
      process.stdout.write('.'); // Heartbeat
    }

  } catch (error) {
    console.error('Error fetching history:', error.message);
  }

  // Poll again in 10 seconds
  setTimeout(watchHistory, 10000);
}

// Start watching
watchHistory();
