const { Events, Embed, EmbedBuilder } = require("discord.js");
const Get_Data = require("../Modules/DataFetcher.js");
const fs = require("fs");

async function sendMessage(client) {
  const guild = await client.guilds.fetch("690342051778396403");
  const channel = await guild.channels.fetch("1231161796023550013");
  let user = await client.user.fetch("761162510157742081");

  if (user) {

    const guild = await client.guilds.fetch("690342051778396403");
    const channel = await guild.channels.fetch('1231161796023550013');

    const MessageEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Daily tracked videos")
      .setDescription("loading...");

    let Sent = await channel.send("<@273904500539129856>",{embeds: [MessageEmbed]});


    // Message
    let ViewsMessage = "";
    let TitleMessage = "";

    const jsonData = fs.readFileSync("./Data.json");
    const ytData = JSON.parse(jsonData);

    for (const key in ytData) {
      TitleMessage += `[${ytData[key].Title}](${ytData[key].URL}) \n`;
      const CurentViews = await Get_Data(ytData[key].URL);
      ViewsMessage += `${parseInt(CurentViews[1]) - ytData[key].OLD_Views}  \n`;
    }

    //* Send message
    MessageEmbed.setDescription(" ");
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

    Sent.edit({embeds: [MessageEmbed]});
  } else {
    console.error("Invalid channel ID!");
  }
}

module.exports = sendMessage;
