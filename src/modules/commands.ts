import { client } from '../utils/bot';
import Commands from '../models/commands';

const commands = new Commands();

client.on("interactionCreate", async (interaction:any) => { commands.run(interaction); });