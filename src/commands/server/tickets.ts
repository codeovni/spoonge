import Commands from '../../helpers/commands';
import Tickets from '../../models/tickets';

let commands = new Commands();
let tickets = new Tickets();

/* Command info */
let command = {
    name: 'tickets',
    description: 'Ticket system commands',
    options: [
        {
            name: 'create',
            description: 'Create new ticket box',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'title',
                    description: 'Box title',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'description',
                    description: 'Box description',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'image',
                    description: 'Box image',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'category-id',
                    description: 'ID of category to create new channels',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'button-id',
                    description: 'ID of button to create new channels',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'button-name',
                    description: 'Name of button',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'channel-prefix',
                    description: 'Ticket channels prefix (Example: ticket)',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'embed-title',
                    description: 'Title for initial message for ticket channel',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'embed-message',
                    description: 'Initial message for ticket channel',
                    type: 'STRING',
                    required: true
                }
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
    if(!commands.permission(interaction, ['ADMINISTRATOR'])) return;

    if(args[0] == 'create') {

        const [ _, title, description, image, categoryId, buttonId, buttonName, channelPrefix, embedTitle, embedMessage ] = args;

        let boxOptions = {
            title: title,
            description: description,
            image: image,
            buttonId: 'ticket-' + buttonId,
            buttonName: buttonName,
            category: categoryId,
            channelPrefix: channelPrefix,
            embedTitle: embedTitle,
            embedMessage: embedMessage
        }

        tickets.createBox(interaction, boxOptions);

    }

}

/* Register command */
commands.save(command.name, command);