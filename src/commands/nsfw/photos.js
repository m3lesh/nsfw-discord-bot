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
          "1=4k\n2=ass\n3=boobs\n4=pussy\n5=anal\n6=blowjob\n7=Amateur\n8=gif\n9=فخاد\n10=feet\n11=hentai anal\n12=hentai"
        )
        .setRequired(true)
    )
    .setNSFW(true),

  async execute(interaction) {
    const mode = interaction.options.getInteger("mode") ?? 1;

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
            ephemeral: true,
          });
        })
        .catch((err) => {
          // err.message, err.response
        });
    } else {
      return interaction.reply("m3lesh");
    }
  },
};
