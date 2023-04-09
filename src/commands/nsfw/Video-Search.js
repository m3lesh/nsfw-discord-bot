const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PornHub } = require("pornhub.js");
const pornhub = new PornHub();

require("dotenv").config();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("video")
    .setDescription("بحث فيديو")
    .addStringOption((option) =>
      option.setName("keyword").setDescription("بحث").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("video_number").setDescription("عدد الفيديو")
    )
    .addStringOption((option) =>
      option
        .setName("order")
        .setDescription("ابحث حسب all | professional | homemade")
    )
    .addIntegerOption((option) =>
      option.setName("time_min").setDescription("اقل وقت")
    )
    .addIntegerOption((option) =>
      option.setName("time_max").setDescription("اكثر وقت")
    )
    .addIntegerOption((option) =>
      option.setName("page_number").setDescription("عدد الصفحات")
    )
    .setNSFW(true),
  async execute(interaction) {
    const keywoed = interaction.options.getString("keywoed") ?? "hot";
    const order = interaction.options.getString("order") ?? "";
    const time_min = interaction.options.getInteger("time_min") ?? 10;
    const time_max = interaction.options.getInteger("time_max") ?? 30;
    const video_number = interaction.options.getInteger("video_number") ?? 1;
    const page_number = interaction.options.getInteger("page_number") ?? 1;

    const res = await pornhub.searchVideo(keywoed, {
      page: page_number,
      production: order,
      durationMin: time_min,
      durationMax: time_max,
    });

    const embeds = [];
    for (let i = 0; i < res.data.length; i++) {
      if (video_number === i) {
        break;
      }
      embeds.push(
        new EmbedBuilder()

          .setColor(0xfcba03)
          .setAuthor({
            name: res.data[i].title,
            url: res.data[i].url,
          })
          .addFields({
            name: "duration",
            value: res.data[i].duration,
            inline: true,
          })
          .setImage(res.data[i].preview)
          .setTimestamp()
      );
    }

    if (interaction.member.roles.cache.has(process.env.rollid)) {
      return interaction.reply({ embeds ,ephemeral: true,});
    } else {
      return interaction.reply("m3lesh");
    }
  },
};
