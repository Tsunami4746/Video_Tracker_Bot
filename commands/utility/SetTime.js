const { error } = require("console");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const { config } = require("process");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("set-time")
    .setDescription("gives the list of all active tracking")
    .addStringOption((option) =>
    option
      .setName("hour")
      .setDescription("set hour for daily message")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("minutes")
      .setDescription("set minute for daily message or 0")
      .setRequired(true)
  ),
  async execute(interaction) {
    
    await interaction.reply("Pending...")

    const Hour = await interaction.options.getString("hour");
    const Minute = await interaction.options.getString("minutes");

    const jsonData = fs.readFileSync("./Config.json");
      const ConfigData = JSON.parse(jsonData);
      try{
        
        if (parseInt(Hour) > 24 || parseInt(Hour) < 0){
            throw new error(" Incorrect time ")
        }

        if (parseInt(Minute) > 60 || parseInt(Minute) < 0){
            throw new error(" Incorrect time ")
        }
        ConfigData.Time.Hour = Hour
        ConfigData.Time.Minute = Minute
        
        fs.writeFileSync("./Config.json", JSON.stringify(ConfigData));

        interaction.editReply("Successful")

      }
      catch(error){
        console.log(error)
        interaction.editReply("Failed setting time")
      }
      
  },
};