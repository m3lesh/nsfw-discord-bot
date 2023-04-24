const { SlashCommandBuilder } = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();
const element = [];
const query_list = [
  "4k",
  "ass",
  "boobs",
  "pussy",
  "anal",
  "blowjob",
  "gonewild", //Amateur
  "pgif", //gif
  "thigh", //فخد
  "feet",
  "hentai_anal",
  "hentai",
  "hboobs", // hentai  boobs
  "hass", // hentai 2
  "paizuri", // hentai 3
  "lewdneko", // hentai 4
  "hyuri", // hentai 5
  "hthigh", // hentai 6
  "hmidriff", // hentai 7
  "hkitsune", // hentai 8
  "tentacle", // hentai 9
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("photo")
    .setDescription("صورة")
    .addIntegerOption((option) =>
      option
        .setName("mode")
        .setDescription(
          "0=4k 1=ass 2=boobs 3=pussy 4=anal 5=blowjob 6=Amateur 7=gif 8=thigh 9=feet 10=hentai anal 11=hentai"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("photos_number")
        .setDescription("photos numbers")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option.setName("private").setDescription("by default private")
    )
    .setNSFW(true),

  async execute(interaction) {
    const mode = interaction.options.getInteger("mode") ?? 1;
    const photos_number = interaction.options.getInteger("photos_number") ?? 1;
    const private = interaction.options.getBoolean("private") ?? true;

    for (let i = 0; i < photos_number; i++) {
      await superagent
        .get("https://nekobot.xyz/api/image")
        .query({
          type: query_list[mode - 1],
        })
        .then((res) => {
          // res.body, res.headers, res.status
          element.push(res.body.message);
        })
        .catch((err) => {
          // err.message, err.response
        });
    }

    if (interaction.member.roles.cache.has(process.env.roleid)) {
      return interaction.reply({
        content: element.join("\n"),
        ephemeral: private,
      });
    } else {
      return interaction.reply("m3lesh");
    }
  },
};
