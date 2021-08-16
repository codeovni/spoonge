import { client } from '../utils/bot';
import Guilds from '../models/guilds';

const guilds = new Guilds();

client.on("ready", () => { guilds.load(); guilds.insertNewGuildsToDatabase(); });

client.on('guildCreate', (guild:any) => { guilds.insertToDatabase(guild); guilds.setCommands(guild); });

client.on('guildDelete', (guild:any) => { guilds.removeFromDatabase(guild); });