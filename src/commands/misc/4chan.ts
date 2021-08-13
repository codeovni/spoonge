import Commands from '../../models/commands';
import Messages from '../../models/messages';

var commands = new Commands();
var messages = new Messages();

/* Command info */
var command = {
    name: '4chan',
    description: 'Show random images from 4chan.org',
    options: [
        {
            name: 'boards',
            description: 'Select board to show',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Anime & Manga', value: 'a' }
            ]
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
    const [ message ] = args;
}

/* Register command */
commands.register(command.name, command);