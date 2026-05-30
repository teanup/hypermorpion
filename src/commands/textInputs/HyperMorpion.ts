import { TextChannel } from "discord.js";
import { ChatInputCommand } from "../../structures/ChatInputCommand";

export default new ChatInputCommand({
  name: "hypermorpion",
  description: "Start a game of HyperMorpion",
  options: [
    {
      name: "player",
      description: "Select with whom you want to play",
      type: 6,
      required: true
    },
    {
      name: "time-to-play",
      description: "Set the time to play for each player in seconds (default: 120)",
      type: 4,
      required: false
    }
  ],
  run: async ({ client, interaction, args }) => {
    let msgNb = args.getInteger("messages") as number;
    msgNb = msgNb > 100 ? 100 : msgNb;
    msgNb = msgNb < 0 ? 0 : msgNb;

    if (msgNb === 0) {
      const embedNone = await client.getText("commands.textInputs.clear.none");
      await interaction.reply({ embeds: [embedNone], ephemeral: true });
      return;
    }

    await (interaction.channel as TextChannel).bulkDelete(msgNb, true)
      .then(async (messages) => {
        msgNb = messages.size;
        switch (msgNb) {
          case 0:
            const embedNone = await client.getText("commands.textInputs.clear.none");
            await interaction.reply({ embeds: [embedNone], ephemeral: true });
            return;
          case 1:
            const embedOne = await client.getText("commands.textInputs.clear.one");
            await interaction.reply({ embeds: [embedOne], ephemeral: true });
            break;
          default:
            const embed = await client.getText("commands.textInputs.clear.multiple");
            embed.description = embed.description.replace("${msgNb}", msgNb);
            await interaction.reply({ embeds: [embed], ephemeral: true });
            break;
        }

        client.log(`Cleared ${msgNb} messages in ${(interaction.channel as TextChannel).name} by ${interaction.user.tag} [${interaction.user.id}]`, "info");
      });
  }
});
