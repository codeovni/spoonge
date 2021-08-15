import Commands from '../../models/commands';
import Messages from '../../models/messages';
import Database from '../../utils/database';

var commands = new Commands();
var messages = new Messages();
const db = new Database();

/* Command info */
var command = {
    name: 'language',
    description: 'Select bot language',
    options: [
        {
            name: 'select',
            description: 'Select language for bot',
            type: 'STRING',
            required: true,
            choices: [
                { name: 'English', value: 'en_US' },
                { name: 'Spanish', value: 'es_ES' }
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
    let [ lang ] = args;
    db.select('guilds', { guild: interaction.guildId }).then((res:any) => {
        console.log(res[0]);
        console.log(res[1][0].lang);
    });
}

/* Register command */
commands.save(command.name, command);