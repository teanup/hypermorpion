import { ApplicationCommandType, TextChannel } from "discord.js";
import { MessageContextMenuCommand } from "../../structures/MessageContextMenuCommand";

export default new MessageContextMenuCommand({
  name: "Update embed",
  type: ApplicationCommandType.Message,
  run: async ({ client, interaction, args }) => {
    const message = args.getMessage("message");
    if (!message) return;

    // Wrong owner of the message
    if (message.author.id !== client.clientId) {
      const embedBad = await client.getText("commands.contextMenus.update-embed.bad-user");
      await interaction.reply({ embeds: [embedBad], ephemeral: true });
      return;
    }

    // Check if registered message
    const messageId = message.id;
    const channelId = message.channelId;
    const msgName = client.gMessages.get(`${channelId}-${messageId}`);

    if (!msgName) {
      const embedUnknown = await client.getText("commands.contextMenus.update-embed.unknown-message");
      await interaction.reply({ embeds: [embedUnknown], ephemeral: true });
      return;
    }

    // Message data
    const messageData = await client.getMessageData(msgName);

    // Edit message
    await message.edit(messageData);

    // Confirm update
    const embedSuccess = await client.getText("commands.contextMenus.update-embed.updated");
    embedSuccess.description = embedSuccess.description
      .replace("${msgName}", msgName)
      .replace(/\${channelId}/g, channelId);
    embedSuccess.author.url = embedSuccess.author.url
      .replace("${guildId}", client.guildId)
      .replace(/\${channelId}/g, channelId)
      .replace("${messageId}", messageId);

    await interaction.reply({ embeds: [embedSuccess], ephemeral: true });

    client.log(`Updated embed ${msgName} in ${(message.channel as TextChannel).name} by ${interaction.user.tag} [${interaction.user.id}]`, "info");
  }
});
