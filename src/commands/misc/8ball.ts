import * as https from 'https';
import Commands from '../../models/commands';
import Messages from '../../models/messages';

var commands = new Commands();
var messages = new Messages();

/* Command info */
var command = {
    name: '8ball',
    description: 'The Magic 8 Ball Oracle has answer to all the questions',
    options: [
        {
            name: 'question',
            description: 'Ask the Eight Ball',
            type: 'STRING',
            required: true,
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

    let [ message ] = args;

    let selectedResponse:string = '';

    let category = ['positive', 'neutral', 'negative']

    let positive = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes, definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes'
    ]

    let neutral = [
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.'
    ]

    let negative = [
        'Don’t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ]

    /* 9 ball select category */
    let selectedCategory = category[Math.floor(Math.random() * 3)];

    /* 8 ball select positive response */
    if(selectedCategory == 'positive') {
        selectedResponse = positive[Math.floor(Math.random() * 10)];
    } else

    /* 8 ball select neutral response */
    if(selectedCategory == 'neutral') {
        selectedResponse = neutral[Math.floor(Math.random() * 5)];
    } else
    
    /* 8 ball select negative response */
    if(selectedCategory == 'negative') {
        selectedResponse = negative[Math.floor(Math.random() * 5)];
    }

    /* Send image */
    messages.embed(interaction, {
        author: {
            name: '8 Ball',
            iconURL: 'https://i.imgur.com/R0fNWzq.png'
        },
        description: `${interaction.member.user.username} ask:\n**${message}**\n\n8 ball say:\n**${selectedResponse}**`,
        color: 1315860
    });

}

/* Register command */
commands.save(command.name, command);