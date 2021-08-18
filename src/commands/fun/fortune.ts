import { MessageActionRow } from "discord.js";
import Commands from '../../helpers/commands';
import Messages from '../../helpers/messages';
import Buttons from '../../helpers/buttons';
import Guilds from '../../helpers/guilds';
import Global from '../../utils/global';

var commands = new Commands();
var messages = new Messages();
var guilds = new Guilds();
var buttons = new Buttons();
var global = new Global();

/* Command info */
var command = {
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

    let [ message ] = args;

    guilds.lang(interaction.guild.id, 'command', 'fortune').then((lang) => {

        //let fortune = Math.floor(Math.random() * 5);

        let buttonId = global.randomNumber(10);

        const button = buttons.new(`${buttonId}`, `${interaction.member.user.username}}`, false, 'SUCCESS', false);
        const buttonRow = new MessageActionRow().addComponents(button);

        messages.interactionEmbed(interaction, false, false, buttonRow, {
            author: {
                name: 'Fortune Cookie',
                iconURL: 'https://i.imgur.com/R0fNWzq.png'
            },
            description: `${interaction.member.user.username} ${lang["ASK"]}:\n**${message}**\n\n${lang["8_BALL_SAY"]}:\n****`,
            color: 1315860
        });

    });

}

/* Register command */
commands.save(command.name, command);