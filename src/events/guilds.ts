import { client } from '../utils/bot';
import Guilds from '../helpers/guilds';
import Commands from '../helpers/commands';

let guilds = new Guilds();
let commands = new Commands();

/* Bot ready */
client.on("ready", () => { guilds.load(); guilds.insertNewGuildsToDatabase(); });

/* Guild create */
client.on('guildCreate', (guild:any) => { guilds.insertToDatabase(guild); commands.setCommands(guild); });

/* Guild delete */
client.on('guildDelete', (guild:any) => { guilds.removeFromDatabase(guild); });