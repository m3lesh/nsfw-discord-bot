const { SlashCommandBuilder } = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();

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
  "feet",
          "1=4k 2=ass 3=boobs 4=pussy 5=anal 6=blowjob 7=Amateur 8=gif 9=thigh 10= 11=hentai anal 12=hentai"
        )
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option.setName("private").setDescription("by default private")
    )
    .setNSFW(true),

  async execute(interaction) {
    const mode = interaction.options.getInteger("mode") ?? 1;
    const private = interaction.options.getBoolean("private") ?? true;
    if (interaction.member.roles.cache.has(process.env.roleid)) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({
          type: query_list[mode - 1],
        })
        .then((res) => {
          // res.body, res.headers, res.status
          const elem = res.body.message;
          return interaction.reply({
            content: elem,
            ephemeral: private,
          });
        })
        .catch((err) => {
          // err.message, err.response
          return interaction.reply({
            content: err.message,
            ephemeral: Public,
          });
        });
    } else {
      return interaction.reply("m3lesh");
    }
  },
};
