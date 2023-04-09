const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server."),
  async execute(interaction) {
    const getMembersCounts = async (guild) => {
      await guild.fetch();
      const total = guild.approximateMemberCount;
      const online = guild.approximatePresenceCount;
      return {
        total,
        online,
      };
    };
    const { total, online } = await getMembersCounts(interaction.guild);

    return interaction.reply(`Members: ${total} \nOnline: ${online}`);
  },
};
