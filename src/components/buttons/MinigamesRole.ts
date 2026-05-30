import { Button } from "../../structures/Button";

export default new Button({
  customId: "minigames-role",
  run: async ({ client, interaction }) => {
    const hasRole = await client.hasRole(interaction.member, "minigames");

    if (hasRole) {
      await client.removeRole(interaction.member, "minigames");
      const embed = await client.getText("components.buttons.removed-role");
      embed.fields[0].value = embed.fields[0].value.replace("${role}", client.gRoles.get("minigames"));
      await interaction.reply({ embeds: [embed], ephemeral: true });

      return;
    }

    await client.addRole(interaction.member, "minigames");
    const embed = await client.getText("components.buttons.added-role");
    embed.fields[0].value = embed.fields[0].value.replace("${role}", client.gRoles.get("minigames"));
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});
