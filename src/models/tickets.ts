import { MessageActionRow } from "discord.js";
import Guilds from '../helpers/guilds';
import Messages from '../helpers/messages';
import Buttons from '../helpers/buttons';
import Database from '../utils/database';
import Global from '../utils/global';
import dotenv from 'dotenv';
import Logger from '../utils/logger';

dotenv.config();

let log = new Logger();
let guilds = new Guilds();
let db = new Database();
let messages = new Messages();
let buttons = new Buttons();
let global = new Global();

/**
 * Tickets bot class
 *
 * @class Tickets
 */
export default class Tickets {

    /**
     * Create channel
     *
     * @param {*} interaction
     * @return {*}  {Promise<any>}
     * @memberof Tickets
     */
    async run(interaction:any): Promise<any> {

        let id = interaction.customId;
        let isTicket = id.includes("ticket");

        if(isTicket) {
            this.createChannel(interaction, id);
        }

    }

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
            const button = buttons.new(options.buttonId, options.emoji, options.buttonName, false, 'PRIMARY', false);
            const buttonRow = new MessageActionRow().addComponents(button);
            messages.interactionEmbed(interaction, false, false, buttonRow, {
                author: {
                    name: `${options.title}`,
                    iconURL: `${options.image}`
                },
                description: options.description,
                color: 16759552
            });
        }).catch((err) => { log.error('[Tickets] ' + err); });
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

                    interaction.deferReply({ content: '...', ephemeral: false });

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
                            { id: interaction.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'] },
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

                        let messageContent = `<@${interaction.user.id}>`;

                        messages.channelEmbed(channel, embedContent);
                        messages.channelSend(channel, messageContent);
                        interaction.deleteReply();

                    }).catch((err:any) => { log.error('[Tickets] ' + err); });
                }).catch((err:any) => { log.error('[Tickets] ' + err); });

            }

        }).catch((err:any) => { log.error('[Tickets] ' + err); });

    }

}