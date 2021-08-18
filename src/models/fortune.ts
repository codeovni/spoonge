import { MessageActionRow, MessageEmbed } from "discord.js";
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
 * Fortune class
 *
 * @class Fortune
 */
export default class Fortune {

    /**
     * Break cookie
     *
     * @param {*} interaction
     * @memberof Fortune
     */
    async breakCookie(interaction:any) {

        //interaction.deferReply({ content: '...', ephemeral: true });

        db.select('fortune', { cookie: interaction.customId }).then((res:any) => {

            guilds.lang(interaction.member.guild.id, 'command', 'fortune').then((lang) => {

                if(res[0]) {

                    if(`${interaction.user.id}` == `${res[1][0].member}`) {

                        interaction.deferReply({ content: '...' });

                        const button = buttons.new(`cookieopened`, `🥠`, `${lang["OPENED_COOKIE"]}`, false, 'SECONDARY', true);
                        const buttonRow = new MessageActionRow().addComponents(button);

                        db.remove('fortune', { "guild": `${interaction.member.guild.id}`, "cookie": `${interaction.customId}` }).then(async () => {

                            let fortune = lang["FORTUNE"];
                            let fortuneNumber = fortune.length;
                            let selectFortune = await fortune[Math.floor(Math.random() * fortuneNumber)];
                            let money = global.randomNumberBetween(1, 999);
                            let lucky = global.randomNumber(8);

                            selectFortune = await selectFortune.replace('${{money}}', `$${money}`);
                            selectFortune = await selectFortune.replace('{{number}}', `${lucky}`);

                            let openCookie = messages.embed({
                                author: {
                                    name: `${lang["EMBED_TITLE"]}`,
                                    iconURL: 'https://i.imgur.com/xHjk3ZI.png'
                                },
                                description: `${selectFortune}`,
                                color: 15771712,
                                footer: `${lang["EMBED_FOOTER"]} ${interaction.user.username}`
                            });

                            await interaction.message?.edit({ embeds: [ openCookie ], components: [ buttonRow ] });

                            interaction.deleteReply();

                            log.info(`🥠 Cookie opened [ Cookie ID: ${interaction.customId} ] [ GUILD: ${interaction.guild.id} ]`);

                        }).catch((err) => { log.error('[Fortune] ' + err); });

                    } else {

                        interaction.deferReply({ content: '...', ephemeral: true });

                        let embed = messages.embed({
                            title: `Error`,
                            description: `${lang["MEMBER_RESTRICTED"]}`,
                            color: 14692143
                        });

                        interaction.followUp({ embeds: [ embed ] });
                    }

                }

            }).catch((err) => { log.error('[Fortune] ' + err); });

        }).catch((err) => { log.error('[Fortune] ' + err); });

    }

    /**
     * Create new cookie
     *
     * @memberof Fortune
     */
    async createCookie(interaction:any) {

        guilds.lang(interaction.member.guild.id, 'command', 'fortune').then((lang) => {

            let cookie = global.randomNumber(10);

            db.insert('fortune', { "guild": `${interaction.member.guild.id}`, "cookie": `${cookie}`, "member": `${interaction.user.id}` }).then(() => {

                const button = buttons.new(`${cookie}`, `🥠`, `${lang["BREAK_COOKIE"]}`, false, 'SECONDARY', false);
                const buttonRow = new MessageActionRow().addComponents(button);

                messages.interactionEmbed(interaction, false, false, buttonRow, {
                    author: {
                        name: `${lang["EMBED_TITLE"]}`,
                        iconURL: 'https://i.imgur.com/xHjk3ZI.png'
                    },
                    description: `${lang["EMBED_DESCRIPTION"]}`,
                    color: 15771712,
                    footer: `${lang["EMBED_FOOTER"]} ${interaction.user.username}`
                });

                log.info(`🥠 New cookie created [ Cookie ID: ${cookie} ] [ GUILD: ${interaction.guild.id} ]`);

            }).catch((err) => { log.error('[Fortune]' + err); });

        });

    }

}