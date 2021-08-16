import Commands from '../../models/commands';
import Messages from '../../models/messages';
import Guilds from '../../models/guilds';

var commands = new Commands();
var messages = new Messages();
var guilds = new Guilds();

/* Command info */
var command = {
    name: '8ball',
    description: 'The Magic 8 Ball Oracle has answer to all the questions',
    options: [
        {
            name: 'question',
            description: 'Ask the 8 Ball',
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
async function callback(client:any, interaction:any, args:any) {

    let [ message ] = args;

    let lang:any = guilds.lang(interaction.guild.id, 'command', '8ball');

    let selectedResponse:string = '';

    let positive:any = []
    let neutral:any = []
    let negative:any = []

    let category = ['positive', 'neutral', 'negative']

    /* 9 ball select category */
    let selectedCategory = category[Math.floor(Math.random() * 3)];

    /* 8 ball select positive response */
    if(selectedCategory == 'positive') {
        positive = await lang["POSITIVE"]
        selectedResponse = positive[Math.floor(Math.random() * 10)];
    } else

    /* 8 ball select neutral response */
    if(selectedCategory == 'neutral') {
        neutral = await lang["NEUTRAL"]
        selectedResponse = neutral[Math.floor(Math.random() * 5)];
    } else
    
    /* 8 ball select negative response */
    if(selectedCategory == 'negative') {
        negative = await lang["NEGATIVE"]
        selectedResponse = negative[Math.floor(Math.random() * 5)];
    }

    /* Send image */
    messages.embed(interaction, true, false, {
        author: {
            name: '8 Ball',
            iconURL: 'https://i.imgur.com/R0fNWzq.png'
        },
        description: `${interaction.member.user.username} ${lang["ASK"]}:\n**${message}**\n\n${lang["8_BALL_SAY"]}:\n**${selectedResponse}**`,
        color: 1315860
    });

}

/* Register command */
commands.save(command.name, command);