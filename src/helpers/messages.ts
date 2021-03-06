import { MessageEmbed } from "discord.js";

interface EmbedObject {
    title?: string,
    color?: number,
    url?: string,
    author?: {
        name: string,
        iconURL?: string,
        URL?: string
    },
    description?: string,
    thumbnail?: string,
    fields?: any,
    image?: string,
    timestamp?: string,
    footer?: string
}

/**
 * Class message helper
 *
 * @class Commands
 */
export default class Messages {

    /**
     * Send text message
     *
     * @param {*} interaction
     * @param {boolean} [ephemeral=false]
     * @param {string} content
     * @memberof Messages
     */
     async channelSend(channel:any, content:string) {
        return channel.send({ content: content });
    }

    /**
     * Send text message
     *
     * @param {*} interaction
     * @param {boolean} [ephemeral=false]
     * @param {string} content
     * @memberof Messages
     */
    async interactionSend(interaction:any, ephemeral:boolean = false, content:string) {
        /* Delete message of interaction and send embed */
        await interaction.deferReply({ ephemeral: ephemeral });
        await interaction.deleteReply({ ephemeral: ephemeral }).then(() => {
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            return channel.send({ content: content });
        });
    }

    /**
     * FollowUp message
     *
     * @param {*} interaction
     * @param {boolean} [ephemeral=false]
     * @param {string} content
     * @memberof Messages
     */
    followUp(interaction:any, ephemeral:boolean = false, content:string) {
        interaction.followUp({ content: content, ephemeral: ephemeral });
    }

    /**
     * Embed
     *
     * @param {*} content
     * @memberof Messages
     */
    embed(content:any) {

        const messageEmbed = new MessageEmbed();

        if(content.title) {
            messageEmbed.setTitle(content.title);
        }

        if(content.color) {
            messageEmbed.setColor(content.color);
        }

        if(content.url) {
            messageEmbed.setURL(content.url);
        }

        if(content.author) {
            messageEmbed.setAuthor(content.author.name, content.author.iconURL, content.author.URL);
        }

        if(content.description) {
            messageEmbed.setDescription(content.description);
        }

        if(content.thumbnail) {
            messageEmbed.setThumbnail(content.thumbnail);
        }

        if(content.fields) {
            messageEmbed.setFields(content.fields);
        }

        if(content.image) {
            messageEmbed.setImage(content.image);
        }

        if(content.timestamp) {
            messageEmbed.setTimestamp();
        }

        if(content.footer) {
            messageEmbed.setFooter(content.footer);
        }

        return messageEmbed;

    }

    /**
     * Embed message
     *
     * @param {*} interaction
     * @param {boolean} [reply=true]
     * @param {boolean} [ephemeral=false]
     * @param {EmbedObject} content
     * @return {*}
     * @memberof Messages
     */
    async channelEmbed(channel:any, content:EmbedObject) {

        const messageEmbed = new MessageEmbed();

        if(content.title) {
            messageEmbed.setTitle(content.title);
        }

        if(content.color) {
            messageEmbed.setColor(content.color);
        }

        if(content.url) {
            messageEmbed.setURL(content.url);
        }

        if(content.author) {
            messageEmbed.setAuthor(content.author.name, content.author.iconURL, content.author.URL);
        }

        if(content.description) {
            messageEmbed.setDescription(content.description);
        }

        if(content.thumbnail) {
            messageEmbed.setThumbnail(content.thumbnail);
        }

        if(content.fields) {
            messageEmbed.setFields(content.fields);
        }

        if(content.image) {
            messageEmbed.setImage(content.image);
        }

        if(content.timestamp) {
            messageEmbed.setTimestamp();
        }

        if(content.footer) {
            messageEmbed.setFooter(content.footer);
        }

        channel.send({ embeds: [ messageEmbed ] });

    }

    /**
     * Embed message
     *
     * @param {*} interaction
     * @param {boolean} [reply=true]
     * @param {boolean} [ephemeral=false]
     * @param {EmbedObject} content
     * @return {*}
     * @memberof Messages
     */
    async interactionEmbed(interaction:any, reply:boolean, ephemeral:boolean, components:any, content:EmbedObject) {

        await interaction.deferReply({ ephemeral: ephemeral });

        const messageEmbed = new MessageEmbed();

        if(content.title) {
            messageEmbed.setTitle(content.title);
        }

        if(content.color) {
            messageEmbed.setColor(content.color);
        }

        if(content.url) {
            messageEmbed.setURL(content.url);
        }

        if(content.author) {
            messageEmbed.setAuthor(content.author.name, content.author.iconURL, content.author.URL);
        }

        if(content.description) {
            messageEmbed.setDescription(content.description);
        }

        if(content.thumbnail) {
            messageEmbed.setThumbnail(content.thumbnail);
        }

        if(content.fields) {
            messageEmbed.setFields(content.fields);
        }

        if(content.image) {
            messageEmbed.setImage(content.image);
        }

        if(content.timestamp) {
            messageEmbed.setTimestamp();
        }

        if(content.footer) {
            messageEmbed.setFooter(content.footer);
        }

        /* Send embed to channel */
        if(reply) {
            if(components) {
                await interaction.followUp({ embeds: [ messageEmbed ], components: [ components ] });
            } else {
                await interaction.followUp({ embeds: [ messageEmbed ] });
            }
        } else {
            await interaction.deleteReply().then(() => {
                const channel = interaction.guild.channels.cache.get(interaction.channelId);
                if(components) {
                    channel.send({ embeds: [ messageEmbed ], components: [ components ] });
                } else {
                    channel.send({ embeds: [ messageEmbed ] });
                }
            });
        }

    }

}