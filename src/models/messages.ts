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
    * Send text
    *
    * @param {*} interaction
    * @param {string} content
    * @memberof Message
    */
    send(interaction:any, content:string) {
        /* Delete message of interaction and send embed */
        interaction.deferReply({ ephemeral: false }).catch(() => {});
        interaction.deleteReply().then(() => {
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            return channel.send({ content: content });
        });
    }
    /**
    * Reply message
    *
    * @param {*} interaction
    * @param {string} content
    * @param {boolean} ephemeral
    * @memberof Message
    */
    reply(interaction:any, content:string, ephemeral:boolean) {
        interaction.reply({ content: content, ephemeral: ephemeral });
    }
    /**
    * FollowUp message
    *
    * @param {*} interaction
    * @param {string} content
    * @param {boolean} ephemeral
    * @memberof Message
    */
    followUp(interaction:any, content:string, ephemeral:boolean) {
        interaction.followUp({ content: content, ephemeral: ephemeral });
    }
    /**
    * Embed message
    *
    * @param {*} interaction
    * @param {*} content
    * @param {boolean} [noreply=false]
    * @return {*} 
    * @memberof Message
    */
    async embed(interaction:any, content:EmbedObject, noreply:boolean = false) {

        const messageEmbed = new MessageEmbed();

        if(content.title) {
            messageEmbed.setTitle(`${content.title}`);
        }

        if(content.color) {
            messageEmbed.setColor(content.color);
        }

        if(content.url) {
            messageEmbed.setURL(`${content.url}`);
        }

        if(content.author) {
            messageEmbed.setAuthor(content.author.name, content.author.iconURL, content.author.URL);
        }

        if(content.description) {
            messageEmbed.setDescription(`${content.description}`);
        }

        if(content.thumbnail) {
            messageEmbed.setThumbnail(`${content.thumbnail}`);
        }

        if(content.fields) {
            messageEmbed.setFields(content.fields);
        }

        if(content.image) {
            messageEmbed.setImage(`${content.image}`);
        }

        if(content.timestamp) {
            messageEmbed.setTimestamp();
        }

        if(content.footer) {
            messageEmbed.setFooter(`${content.footer}`);
        }

        /* Send embed to channel */
        if(noreply) {
            await interaction.deferReply({ ephemeral: false });
            await interaction.deleteReply();
            const channel = await interaction.guild.channels.cache.get(interaction.channelId);
            return channel.send({ embeds: [ messageEmbed ] });

        } else {
            /* Send embed to interaction */
            return interaction.reply({ embeds: [ messageEmbed ] });
        }
        
    }

}