const os = require("os");
const fs = require("fs");
const { CronJob } = require("cron");

const logFile = "logs/resource_usage.log";

function getSystemUsage() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    totalMem: (totalMem / 1024 / 1024).toFixed(2) + " MB",
    usedMem: (usedMem / 1024 / 1024).toFixed(2) + " MB",
    freeMem: (freeMem / 1024 / 1024).toFixed(2) + " MB",
    percentageMem: ((100 * usedMem) / totalMem).toFixed(2) + "%",
  };
}

function logUsage() {
  const usage = getSystemUsage();
  const logEntry = `${usage.timestamp} - Used Memory: ${usage.usedMem} (${usage.percentageMem}), Free Memory: ${usage.freeMem}\n`;
  fs.appendFileSync(logFile, logEntry);
}
const schedualLogJob = new CronJob(
  "0 */5 * * * *",
  function () {
    logUsage();
  },
  null,
  false,
  "America/New_York"
);

module.exports = {
    schedualLogJob,
}