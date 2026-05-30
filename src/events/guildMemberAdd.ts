import { GuildMember, TextChannel } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";

export default new Event("guildMemberAdd", async (member: GuildMember) => {
  client.log(`${member.user.username}#${member.user.discriminator} [${member.user.id}] joined the server`, "info");

  if (member.user.bot) {
    // Give bot role
    await client.addRole(member, "bot");

    // Announce new bot
    const botChannel = await member.guild.channels.fetch(client.gChannels.get("bot") as string) as TextChannel;
    const embed = await client.getText("events.guildMemberAdd.bot");
    embed.title = embed.title
      .replace("${botName}", member.user.username);
    embed.description = embed.description
      .replace("${userId}", member.user.id);

    await botChannel.send({ embeds: [embed] });
    return;
  }

  // Give player role
  await client.addRole(member, "player");

  // Welcome player
  const welcomeChannel = await member.guild.channels.fetch(client.gChannels.get("welcome") as string) as TextChannel;
  const infoChannel = client.gChannels.get("info") as string;

  const embed = await client.getText("events.guildMemberAdd.player");
  embed.description = embed.description
    .replace("${userId}", member.user.id)
    .replace(/\${infoChannel}/g, infoChannel);

  await welcomeChannel.send({ embeds: [embed] });
});
