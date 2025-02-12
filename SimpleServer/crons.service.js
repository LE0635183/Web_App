const cron = require("cron");

const pattern = "*/10 * * * * *"; // every 10 seconds
const tickMethod = () => {
  console.log("This message will show every 10 seconds");
};
const autoStart = false;
const cronJob = new cron.CronJob(pattern, tickMethod, null, autoStart, "America/Los_Angeles");

function startCron() {
  cronJob.start();
}

function stopCron() {
  cronJob.stop();
}

module.exports = { startCron, stopCron, };
