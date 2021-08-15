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

    loadModules() {
        return new Promise((resolve) => {

            const folder = fs.readdirSync(path.join(root, `/modules`));
            const files = folder.filter(file => file.includes('.js'));

            let loadedModules = 0;
            let numModules:number = files.length;

            /* Load all files from modules folder */
            for(let i = 0; i < files.length; i++) {

                const modulePath = `../modules/${files[i]}`;

                /* Import modules */
                import(modulePath).then(() => {

                    log.info(`Module [ ${kleur.magenta(files[i])} ] loaded! ${check}`);

                    loadedModules++;

                }).catch(error => {
                    log.error(`Error on module: ${files[i]}`);
                    log.error(error);
                });

            }

            let modulesInterval = setInterval(() => {
                if(loadedModules == numModules) {
                    log.info(`📦 ${loadedModules} modules loaded!`);
                    clearInterval(modulesInterval);
                    resolve(true);
                }
            }, 1);

        });
    }

}