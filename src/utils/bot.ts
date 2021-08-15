import { Client, Intents, Collection } from "discord.js";
export var client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
export var commands = new Collection();
export default client;