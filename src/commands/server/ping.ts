import Commands from '../../helpers/commands';
import Messages from '../../helpers/messages';

let commands = new Commands();
let messages = new Messages();

/* Command info */
let command = {
    name: 'ping',
    description: 'Show bot ping in milliseconds',
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
function callback(client:any, interaction:any, args:any) {
    let message = `Pong! My ping is ${client.ws.ping}ms`;
    messages.interactionEmbed(interaction, true, false, false, { description: message, color: 16759552 });
}

/* Register command */
commands.save(command.name, command);