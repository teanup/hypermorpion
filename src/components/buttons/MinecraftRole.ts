import { Button } from "../../structures/Button";

export default new Button({
  customId: "minecraft-role",
  run: async ({ client, interaction }) => {
    const hasRole = await client.hasRole(interaction.member, "minecraft");

    if (hasRole) {
      await client.removeRole(interaction.member, "minecraft");
      const embed = await client.getText("components.buttons.removed-role");
      embed.fields[0].value = embed.fields[0].value.replace("${role}", client.gRoles.get("minecraft"));
      await interaction.reply({ embeds: [embed], ephemeral: true });

      return;
    }

    await client.addRole(interaction.member, "minecraft");
    const embed = await client.getText("components.buttons.added-role");
    embed.fields[0].value = embed.fields[0].value.replace("${role}", client.gRoles.get("minecraft"));
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});
