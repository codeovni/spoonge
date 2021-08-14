import Commands from '../../models/commands';
import Messages from '../../models/messages';

var commands = new Commands();
var messages = new Messages();

/* Command info */
var command = {
    name: 'ping',
    description: 'Show bot\'s ping',
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
    messages.send(interaction, `Pong! My ping is \`${client.ws.ping}\` ms`);
}

/* Register command */
commands.register(command.name, command);