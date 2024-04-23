const { error } = require("console");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("removes the youtube video to the tracking list")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("url of the youtube video to be added")
        .setRequired(true)
    ),

  async execute(interaction) {
    const recievedUrl = interaction.options.getString("url");

    //* Embed
    const MessageEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Videos ")
      .setDescription("Pending...");

    await interaction.reply({ embeds: [MessageEmbed] });

    try {
      // * Getting list
      const jsonData = fs.readFileSync("./data.json");
      const ytData = JSON.parse(jsonData);

      if (Object.keys(ytData).length === 0) {
        throw new error("URL not found");
      }

      let i = 0;
      for (const key in ytData) {
        if (recievedUrl == ytData[key].URL) {
          delete ytData[key];
          break;
        }
        i++;
        if (i === Object.keys(ytData).length) {
          throw new error("URL not found");
        }
      }

      //* Updating the file

      fs.writeFileSync("./Data.json", JSON.stringify(ytData));

      //* repling back
      MessageEmbed.setDescription("Successfully removed video");

      await interaction.editReply({ embeds: [MessageEmbed] });
    } catch (error) {
      MessageEmbed.setDescription(`<${recievedUrl}> not found!`);

      await interaction.editReply({ embeds: [MessageEmbed] });
    }
  },
};
