import Commands from '../../models/commands';
import Messages from '../../models/messages';

var commands = new Commands();
var messages = new Messages();

/* Command info */
var command = {
    name: 'say',
    description: 'Send text as a bot with direct message or embed',
    options: [
        {
            name: 'message',
            description: 'Message to say',
            type: 'STRING',
            required: true
        },
        {
            name: 'embed',
            description: 'Embed message?',
            type: 'BOOLEAN',
            required: false
        }
    ],
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
    if(!commands.permission(interaction, ['MANAGE_MESSAGES'])) return;
    const [ message, embed ] = args;
    if(embed) {
        messages.embed(interaction, { description: message, color: 16759552 }, true);
    } else {
        messages.send(interaction, message);
    }
}

/* Register command */
commands.register(command.name, command);