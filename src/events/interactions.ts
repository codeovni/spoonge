import { client } from '../utils/bot';
import Tickets from '../models/tickets';
import Fortune from '../models/fortune';
import Commands from '../helpers/commands';

let tickets = new Tickets();
let commands = new Commands();
let fortune = new Fortune();

/* Interaction create */
client.on("interactionCreate", async (interaction:any) => {

    /* Commands */
    if(interaction.isCommand()) {
        commands.run(interaction);
    }

    /* Tickets */
    if(interaction.isButton()) {
        tickets.run(interaction);
    }

    /* Fortune cookies */
    if(interaction.isButton()) {
        fortune.breakCookie(interaction);
    }

});