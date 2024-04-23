const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Get_Data = require("../../Modules/DataFetcher.js");
const fs = require("fs");
const { error } = require("console");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("gives the list of all active tracking"),
  async execute(interaction) {
    //* embed
    const MessageEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Video List")
      .setDescription("loading...");

    await interaction.reply({ embeds: [MessageEmbed] });
    try {
      //* getting list

      const jsonData = fs.readFileSync("./data.json");
      const ytData = JSON.parse(jsonData);


      // * checking if the list is not empty

      if (Object.keys(ytData).length == 0){throw new error("No item in the list")}

      //* making the list

      let ViewsMessage = "" 
      let TitleMessage = ""
      
      for (const key in ytData) {
          TitleMessage += `[${ytData[key].Title}](${ytData[key].URL}) \n`
          const CurentViews = await Get_Data(ytData[key].URL)
          ViewsMessage += `${parseInt(CurentViews[1]) - ytData[key].OLD_Views}  \n`
      }

      //* Send message
      MessageEmbed.setDescription(" ")
      MessageEmbed.addFields(
          {
            name: "Videos",
            value: TitleMessage,
            inline: true,
          },
          {
            name: "Gained",
            value: ViewsMessage,
            inline: true,
          }
        );

      //* replying back
    MessageEmbed.setDescription(" ");
    await interaction.editReply({ embeds: [MessageEmbed] });
    } catch (error) {
     
      MessageEmbed.setDescription("No videos being tracked");
    await interaction.editReply({ embeds: [MessageEmbed] });
    }
  },
};
