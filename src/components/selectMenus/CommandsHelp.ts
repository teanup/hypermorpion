import { SelectMenu } from "../../structures/SelectMenu";

export default new SelectMenu({
  customId: "commands-help",
  run: async ({ client, interaction }) => {
    const selected = interaction.values.at(0);

    const embed = await client.getText(`components.selectMenus.commandsHelp.${selected}`);
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});
