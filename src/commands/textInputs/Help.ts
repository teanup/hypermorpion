import { ChatInputCommand } from "../../structures/ChatInputCommand";

export default new ChatInputCommand({
  name: "help",
  description: "Help with in-game commands",
  run: async ({ client, interaction }) => {
    const embed = await client.getText("commands.textInputs.help");
    const components = await client.getComponents("minecraft");

    await interaction.reply({ embeds: [embed], components });
  }
});
