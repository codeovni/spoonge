import { client } from '../utils/bot';
import Guilds from '../models/guilds';
import Commands from '../models/commands';

const guilds = new Guilds();
const commands = new Commands();

client.on("ready", () => { guilds.load(); guilds.insertNewGuildsToDatabase(); });

client.on('guildCreate', (guild:any) => { guilds.insertToDatabase(guild); commands.setCommands(guild); });

client.on('guildDelete', (guild:any) => { guilds.removeFromDatabase(guild); });