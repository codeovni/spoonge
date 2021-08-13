import { client, slashCommands } from '../utils/bot';
import Messages from '../models/messages';
import { GuildMember } from "discord.js";
import Logger from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const log = new Logger();
const messages = new Messages();
const root = fs.realpathSync('./app');

var commandsArray:any = []

/**
 * Commands class
 *
 * @class Commands
 */
export default class Commands {
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

                        if(res) {
                            log.info(`Command [ ${category}/${commands[i]} ] loaded! ✔️`);
                            loadedCommands++;
                        }

                    }).catch(error => {
                        log.error(`Error on command: ${commands[i]}`);
                        log.error(error);
                    });

                }

            }

            let inter = setInterval(() => {
                if(loadedCommands == numCommands) {
                    log.info(`⌨️  ${loadedCommands} commands loaded!`);
                    this.set();
                    clearInterval(inter);
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
    register(name:string, command:object): void {
        slashCommands.set(name, command);
        commandsArray.push(command);
    }
    /**
    * Set bot commands
    *
    */
    set(): void {
        client.application?.commands.set(commandsArray);
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
        if(member.permissions.has(permissions)) {
            messages.embed(interaction, { title: 'Permissions', description: 'You don\'t have permission to use this command', color: 16722737 } );
            return false;
        } else {
            return true;
        }
    }

}