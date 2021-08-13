import { Client, Intents, Collection } from "discord.js";
export const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
export var slashCommands = new Collection();
export default client;