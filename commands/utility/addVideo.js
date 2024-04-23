const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const Get_Data = require("../../Modules/DataFetcher.js");
const { error } = require("console");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add the youtube video to the tracking list")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("url of the youtube video to be added")
        .setRequired(true)
    ),

  async execute(interaction) {
    //* URL recieved
  const recievedUrl = interaction.options.getString("url");

  // * embed message
    const MessageEmbed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle(`Adding video `)
		.setDescription(`Pending...`);

  await interaction.reply({embeds : [MessageEmbed]});

    //* Getting existing data
    const jsonData = fs.readFileSync("./Data.json");
    const ytData = JSON.parse(jsonData);
    let error = ""
    try {
      const VideoData = await Get_Data(recievedUrl);

      //* checking if the data repeats
      const jsonData = fs.readFileSync("./data.json");
      const ytData = JSON.parse(jsonData);

      let iteration = 0

      for (const key in ytData) {
        if (recievedUrl == ytData[key].URL) {
          throw new error("URL already exist")
          break;
        }
        iteration++;
      }

      //! saving data
      let i = (Object.keys(ytData)[Object.keys(ytData).length - 1] === undefined) ? 0 : Number(Object.keys(ytData)[Object.keys(ytData).length - 1])
      ytData[i + 1] = {
        Title: VideoData[0],
        URL: recievedUrl,
        OLD_Views: VideoData[1],
      };
      //* writing it to the file
      fs.writeFileSync("./Data.json", JSON.stringify(ytData));

      //* replying back

      MessageEmbed.setDescription(`Successfully added [${VideoData[0]}](${recievedUrl})`)
      interaction.editReply({embeds : [MessageEmbed]});

    } catch (error) {
      // console.log(error)
      //* failed to save
      MessageEmbed.setDescription(`Video already added`)
      interaction.editReply({embeds : [MessageEmbed]});
    }
  },
};
