const { Events, Embed, EmbedBuilder } = require("discord.js");
const schedule = require("node-schedule");
const sendMessage = require("../Modules/Message.js");
const UpdateViews = require("../Modules/UpdateViews.js");
const fs = require("fs");
const { send } = require("process");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    //Sends message daily

    const rule = new schedule.RecurrenceRule();

    const jsonData = fs.readFileSync("./Config.json");
    const ConfigData = JSON.parse(jsonData);

    rule.hour = ConfigData.Time.Hour;
    rule.minute = ConfigData.Time.Minute;
    
    let job = schedule.scheduleJob(rule, function (fireDate) {
      sendMessage(client);
      UpdateViews();
    });
    setInterval((func) => {

      const jsonData = fs.readFileSync("./Config.json");
      const ConfigData = JSON.parse(jsonData);

      rule.hour = ConfigData.Time.Hour;
      rule.minute = ConfigData.Time.Minute;

      job.cancel(true);

      job = schedule.scheduleJob(rule, function (fireDate) {
        sendMessage(client);
        UpdateViews();
      });
    }, 6000);

  },
};
