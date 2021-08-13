import client from '../utils/bot';
import Logger from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const log = new Logger();
const token = process.env.APP_TOKEN;
const root = fs.realpathSync('./app');

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
            const files = folder.filter(x => x.includes('.js'));

            let filesLoaded = 0;

            /* Load all files from modules folder */
            for(let i = 0; i < files.length; i++) {

                const modulesPath = `../modules/${files[i]}`;

                /* Import modules */
                import(modulesPath).then(res => {

                    if(res) {
                        log.info(`Module [ ${files[i]} ] loaded! ✔️`);
                    }

                    filesLoaded++;
                    if(filesLoaded == files.length) {
                        log.info(`📦 ${filesLoaded} modules loaded!`);
                        resolve(true);
                    }

                }).catch(error => {
                    log.error(`Error on module: ${files[i]}`);
                    log.error(error);
                });

            }
        });
    }

}