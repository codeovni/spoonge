import Commands from '../../helpers/commands';
import Fortune from '../../models/fortune';

let fortune = new Fortune();
let commands = new Commands();

/* Command info */
let command = {
    name: 'fortune',
    description: 'Break the cookie to see your luck',
    run: async (client:any, interaction:any, args:any) => {
        callback(client, interaction, args);
    }
}

/**
 * Callback function
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {String[]} args
 */
async function callback(client:any, interaction:any, args:any) {
    fortune.createCookie(interaction);
}

/* Register command */
commands.save(command.name, command);