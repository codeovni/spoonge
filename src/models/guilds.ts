import { client } from '../utils/bot';
import Database from '../utils/database';
import Logger from '../utils/logger';

const log = new Logger();
const db = new Database();

let guildsList:Array<string> = []

/**
 * Guilds System
 *
 * @class Guilds
 */
export default class Guilds {

    /**
    * Load all guilds ids
    *
    * @memberof Guilds
    */
    async loadAll() {
        client.guilds.cache.map(guild => {
            guildsList.push(guild.id);
        });
    }

    /**
    * Insert guild to database
    *
    * @param {*} guild
    * @memberof Guilds
    */
    async insertToDatabase(guild:any) {
        db.insert('guilds', { "guild": guild.id, "lang": 'en_US' }).then(() => {
            log.info(`Joined new guild ${guild.name} [ID:${guild.id}]`);
        });

    }

    /**
    * Remove guild from database
    *
    * @param {*} guild
    * @memberof Guilds
    */
    async removeFromDatabase(guild:any) {
        db.remove('guilds', { "guild": guild.id }).then(() => {
            log.info(`Leave from guild ${guild.name} [ID:${guild.id}]`);
        });
    }
}