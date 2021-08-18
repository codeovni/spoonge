import { client } from '../utils/bot';
import Tickets from '../models/tickets';
import Commands from '../helpers/commands';

const tickets = new Tickets();
const commands = new Commands();

/* Interaction create */
client.on("interactionCreate", async (interaction:any) => {
    commands.run(interaction);
    tickets.run(interaction);
});