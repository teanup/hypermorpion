import { client } from "..";
import { Event } from "../structures/Event";

export default new Event("ready", async () => {
  client.log(`Bot logged in as ${client.user?.tag}`, "info");

  // Load data
  await client.loadRoles();
  await client.loadChannels();
  await client.loadMessages();
});
