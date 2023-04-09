const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PornHub } = require("pornhub.js");
const pornhub = new PornHub();

require("dotenv").config();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("GIF بحث")
    .addStringOption((option) =>
      option.setName("keywoed").setDescription("بحث").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("gif_number").setDescription("عدد GIF")
    )
    .addStringOption((option) =>
      option
        .setName("sexualorientation")
        .setDescription("straight | gay | transgender")
    )
    .addStringOption((option) =>
      option
        .setName("order")
        .setDescription(
          "ابحث حسب Most Relevant | Most Recent | Most Viewed | Top Rated"
        )
    )
    .addIntegerOption((option) =>
      option.setName("page_number").setDescription("عدد الصفحات")
    )

    .setNSFW(true),
  async execute(interaction) {
    const keywoed = interaction.options.getString("keywoed") ?? "";
    const sexualOrientation =
      interaction.options.getString("order") ?? "straight";
    const order = interaction.options.getString("order") ?? "Top Rated";
    const gif_number = interaction.options.getInteger("gif_number") ?? 1;
    const page_number =
      interaction.options.getInteger("page_number") ?? 1;

    const res = await pornhub.searchGif(keywoed, {
      page: page_number,
      order: order,
      sexualOrientation: sexualOrientation,
    });

    const mp4 = [];

    if (interaction.member.roles.cache.has(process.env.rollid)) {
      for (let i = 0; i < res.data.length; i++) {
        if (gif_number === i) {
          break;
        }
        const element = res.data[i].title + "\n" + res.data[i].mp4;
        mp4.push(element);
      }
      return interaction.reply({
        content: mp4.join("\n"),
        ephemeral: true,
      });
    } else {
      return interaction.reply("m3lesh");
    }
  },
};
