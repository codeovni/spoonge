import Commands from '../../helpers/commands';
import Messages from '../../helpers/messages';

let commands = new Commands();
let messages = new Messages();

/* Command info */
let command = {
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

    /* Send embed */
    if(embed) {
        messages.interactionEmbed(interaction, false, false, false, { description: message, color: 16759552 });
    } else

    /* Send message */
    if(!embed || embed == undefined) {
        messages.interactionSend(interaction, false, message);
    }
}

/* Register command */
commands.save(command.name, command);