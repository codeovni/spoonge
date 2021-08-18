import { client } from '../utils/bot';
import Guilds from '../helpers/guilds';
import Commands from '../helpers/commands';

const guilds = new Guilds();
const commands = new Commands();

client.on("ready", () => { guilds.load(); guilds.insertNewGuildsToDatabase(); });

/* Guild create */
client.on('guildCreate', (guild:any) => { guilds.insertToDatabase(guild); commands.setCommands(guild); });

/* Guild delete */
client.on('guildDelete', (guild:any) => { guilds.removeFromDatabase(guild); });