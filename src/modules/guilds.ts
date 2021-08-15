import { client } from '../utils/bot';
import Guilds from '../models/guilds';

const guilds = new Guilds();

client.on("ready", () => { guilds.loadAll(); });

client.on('guildCreate', (guild:any) => { guilds.insertToDatabase(guild); });

client.on('guildDelete', (guild:any) => { guilds.removeFromDatabase(guild); });