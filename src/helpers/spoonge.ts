import client from '../utils/bot';
import Logger from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import kleur from 'kleur';

dotenv.config();

const log = new Logger();
const token = process.env.APP_TOKEN;
const root = fs.realpathSync('./app');
const check = kleur.green('✔');

/**
 * Spoonge bot class
 *
 * @class Spoonge
 */
export default class Spoonge {
    /**
    * Bot login with token
    *
    * @memberof Spoonge
    */
    login() {
        return new Promise((resolve) => {
            client.login(token).then(() => {
                log.info(`Connected on ${client.guilds.cache.size} servers`);
                resolve(true);
            }).catch((err) => {
                log.error(err);
            });
        });
    }

    /**
     * Load all commands
     *
     * @return {*}
     * @memberof Commands
     */
    loadCommands() {

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
                    await import(commandPath).then(() => {

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
                    clearInterval(commandsInterval);
                    resolve(true);
                }
            }, 1);

        });

    }

    /**
     * Load all events
     *
     * @return {*}
     * @memberof Commands
     */
    loadEvents() {
        return new Promise((resolve) => {

            const folder = fs.readdirSync(path.join(root, `/events`));
            const files = folder.filter(file => file.includes('.js'));

            let loadedEvents = 0;
            let numEvents:number = files.length;

            /* Load all files from events folder */
            for(let i = 0; i < files.length; i++) {

                const eventsPath = `../events/${files[i]}`;

                /* Import events */
                import(eventsPath).then(() => {

                    log.info(`Event [ ${kleur.magenta(files[i])} ] loaded! ${check}`);

                    loadedEvents++;

                }).catch(err => {
                    log.error(`Error on event: ${files[i]}`);
                    log.error(err);
                });

            }

            let eventsInterval = setInterval(() => {
                if(loadedEvents == numEvents) {
                    log.info(`📦 ${loadedEvents} events loaded!`);
                    clearInterval(eventsInterval);
                    resolve(true);
                }
            }, 1);

        });
    }

}