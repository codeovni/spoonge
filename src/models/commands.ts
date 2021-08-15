import { client, commands } from '../utils/bot';
import { GuildMember } from "discord.js";
import Messages from './messages';
import Logger from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import kleur from 'kleur';

dotenv.config();

const messages = new Messages();
const log = new Logger();
const root = fs.realpathSync('./app');
const check = kleur.green('✔');

var devMode = process.env.DEV_MODE;
var guildID = process.env.GUILD_ID;
var commandList:any = []

/**
 * Commands class
 *
 * @class Commands
 */
export default class Commands {
    /**
     * Load all commands
     *
     * @return {*} 
     * @memberof Commands
     */
    load() {
        return new Promise(async (resolve) => {

            var folder = fs.readdirSync(path.join(root, '/commands'));
            var folders = folder.filter(folder => !folder.includes('.js'));

            let loadedCommands:number = 0;
            let numCommands:number = 0;

            /* Load all command folders */
            for(let i = 0; i < folders.length; i++) {

                var category = folders[i];
                var catFolder = fs.readdirSync(path.join(root, `/commands/${category}`));
                var commands = catFolder.filter(file => file.includes('.js'));

                numCommands = numCommands + commands.length;

                /* Load all commands */
                for(let i = 0; i < commands.length; i++) {

                    var commandPath = `../commands/${category}/${commands[i]}`;

                    /* Import command */
                    await import(commandPath).then(res => {

                        log.info(`Command [ ${kleur.magenta(`${category}/${commands[i]}`)} ] loaded! ${check}`);

                        loadedCommands++;

                    }).catch(error => {
                        log.error(`Error on command: ${commands[i]}`);
                        log.error(error);
                    });

                }

            }

            let commandsInterval = setInterval(() => {
                if(loadedCommands == numCommands) {
                    log.info(`⌨️  ${loadedCommands} commands loaded!`);
                    this.set();
                    clearInterval(commandsInterval);
                    resolve(true);
                }
            }, 1);

        });
    }

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
    * Set bot commands
    *
    */
    set(): void {
        client.application?.commands.set(commandList).then(() => {
            this.register();
        });
    }

    /**
     * Check member permissions
     *
     * @param {*} interaction
     * @param {*} permissions
     * @return { Promise<boolean> }
     * @memberof Commands
     */
    async permission(interaction:any, permissions:any):Promise<boolean> {
        const member: GuildMember = interaction.member;
        if(!member.permissions.has(permissions)) {
            messages.embed(interaction, { title: 'Permissions', description: 'You don\'t have permission to use this command', color: 16722737 } );
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
    run(interaction:any) {

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
    * Register command to guild or global 
    * DEV_MODE=true to dev mode
    * DEV_MODE=false to production mode
    *
    * @memberof Commands
    */
    async register() {
        /* Use dev mode to create new commands */
        if(devMode == 'true') {
            /* Unset all global and guild commands */
            await client.application?.commands.set([]);
            await client.guilds.cache.get(`${guildID}`)?.commands.set([]);
            /* Set new commands */
            await client.guilds.cache.get(`${guildID}`)?.commands.set(commandList);
        } else { 
            /* Unset all global commands */
            await client.application?.commands.set([]);
            /* Set new commands */
            await client.application?.commands.set(commandList);
        }
    }

}