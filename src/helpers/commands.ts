import { client, commands } from '../utils/bot';
import { GuildMember } from "discord.js";
import Messages from './messages';
import Guilds from './guilds';
import dotenv from 'dotenv';

dotenv.config();

let guilds = new Guilds();
let messages = new Messages();

let devMode = process.env.DEV_MODE;
let commandList:any = []

// Application commands docs
// https://discord.com/developers/docs/interactions/application-commands

/**
 * Commands class
 *
 * @class Commands
 */
export default class Commands {

    /**
    * Register bot commands
    *
    * @param {string} name
    * @param {object} command
    * @memberof Commands
    */
    save(name:string, command:object): void {
        /* Set command to collector command */
        commands.set(name, command);
        /* Push commands to command list */
        commandList.push(command);
    }

    /**
     * Check member permissions
     *
     * @param {*} interaction
     * @param {*} permissions
     * @return { Promise<boolean> }
     * @memberof Commands
     */
    async permission(interaction:any, permissions:any): Promise<boolean> {
        const member: GuildMember = interaction.member;
        if(!member.permissions.has(permissions)) {
            let lang:any = guilds.lang(interaction.guild.id, 'system');
            messages.interactionEmbed(interaction, true, true, '', { title: lang["PERMISSIONS_TITLE"], description: lang["NO_PERMISSION"], color: 16722737 } );
            return false;
        } else {
            return true;
        }
    }

    /**
    * Run command on interaction
    *
    * @param {*} interaction
    * @return {*}
    * @memberof Commands
    */
    async run(interaction:any): Promise<any> {

        if(!interaction.isCommand()) return;

        const command:any = commands.get(interaction.commandName);
        if(!command) return;

        const args:any = [];

        for(let option of interaction.options.data) {
            if(option.type === "SUB_COMMAND") {
                if(option.name) {
                    args.push(option.name);
                }
                option.options.forEach((block:any) => {
                    if(block.value) {
                        args.push(block.value);
                    }
                });
            } else if(option.value) {
                args.push(option.value);
            }
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        command.run(client, interaction, args);
    }

    /**
     * Get command list
     *
     * @return {*}
     * @memberof Commands
     */
    getCommandList(): any {
        return commandList;
    }

    /**
    * Set guild commands
    *
    * @param {*} guild
    * @memberof Guilds
    */
    async setCommands(guild:any) {
        let commandList = this.getCommandList();
        if(devMode == 'true') {
            await client.application?.commands.set([]);
            await client.guilds.cache.get(`${guild.id}`)?.commands.set([]);
            client.guilds.cache.get(`${guild.id}`)?.commands.set(commandList);
        } else {
            await client.application?.commands.set([]);
            await client.application?.commands.set(commandList);
        }
    }

}