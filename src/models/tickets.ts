import { MessageActionRow } from "discord.js";
import Guilds from './guilds';
import Messages from '../helpers/messages';
import Buttons from '../helpers/buttons';
import Database from '../utils/database';
import Global from '../utils/global';
import dotenv from 'dotenv';

dotenv.config();

const guilds = new Guilds();
const db = new Database();
const messages = new Messages();
const buttons = new Buttons();
const global = new Global();

/**
 * Tickets bot class
 *
 * @class Tickets
 */
export default class Tickets {

    /**
    * Create ticket box
    *
    * @param {*} interaction
    * @param {*} options
    * @return {*}  {Promise<any>}
    * @memberof Tickets
    */
    async createBox(interaction:any, options:any): Promise<any> {

        let dbOptions = {
            "guild": interaction.member.guild.id,
            "buttonid": options.buttonId,
            "parent": options.category,
            "message": options.embedMessage,
            "title": options.embedTitle,
            "prefix": options.channelPrefix
        }

        db.insert('tickets', dbOptions).then(() => {
            const button = buttons.new(options.buttonId, options.buttonName, false, 'SUCCESS', false);
            const buttonRow = new MessageActionRow().addComponents(button);
            messages.interactionEmbed(interaction, false, false, buttonRow, { title: options.title, description: options.description, color: 16759552 });
        }).catch(() => {});
    }

    /**
    * Create ticket channel
    *
    * @memberof Tickets
    */
    async createChannel(interaction:any, buttonid:any): Promise<any> {

        db.select('tickets', { guild: interaction.member.guild.id, buttonid: buttonid }).then((res:any) => {

            if(res[0]) {

                guilds.lang(interaction.guild.id, 'command', 'tickets').then((lang) => {

                    interaction.deferReply({ content: '', ephemeral: false });

                    let embedImage = 'https://i.imgur.com/eiMIlTD.png';
                    if(res[1][0].image) { embedImage = res[1][0].image; }
                    let ticketNumber = global.randomNumber(5);
                    let channelName = res[1][0].prefix + '-' + ticketNumber;
                    let channelCategory = res[1][0].parent;
                    let embedTitle = res[1][0].title;
                    let embedMessage = res[1][0].message;

                    interaction.guild.channels.create(`${channelName}`, {
                        parent: `${channelCategory}`,
                        type: 'text',
                        permissionOverwrites: [
                            { id: interaction.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] },
                            { id: interaction.guild.roles.everyone,  deny: ['VIEW_CHANNEL'] }
                        ]
                    }).then(async (channel:any) => {

                        let embedContent = {
                            author: {
                                name: `${embedTitle}`,
                                iconURL: `${embedImage}`
                            },
                            description: `${embedMessage}`,
                            color: 16759552,
                            footer: `ID: ${ticketNumber} | ${lang['FOOTER_OPENED_BY']} ${interaction.user.username}#${interaction.user.discriminator}`
                        }

                        messages.channelEmbed(channel, false, false, false, embedContent);

                        interaction.deleteReply();

                    });
                });

            }

        });

    }

}