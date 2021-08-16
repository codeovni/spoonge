import { client } from '../utils/bot';
import Database from '../utils/database';
import Logger from '../utils/logger';
import Languages from '../models/languages';
import Commands from '../models/commands';
import dotenv from 'dotenv';

dotenv.config();

let commands = new Commands();
let language = new Languages();
const log = new Logger();
const db = new Database();

let devMode = process.env.DEV_MODE;
let guildsList:Array<any> = []

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
    async load() {
        client.guilds.cache.map(guild => {
            db.select('guilds', { guild: guild.id }).then((res:any) => {
                guildsList.push({ 'id': `${guild.id}`, 'lang': `${res[1][0].lang}` });
            });
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
        }).catch(() => {});
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

    /**
    * Insert all guilds to database
    *
    * @param {*} guild
    * @memberof Guilds
    */
     async insertNewGuildsToDatabase() {
        client.guilds.cache.map((guild:any) => {
            db.select('guilds', { guild: guild.id }).then((res:any) => {
                if(!res[0]) {
                    this.insertToDatabase(guild);
                }
            });
        });
    }

    /**
    * Guild language
    *
    * @param {string} guildid
    * @memberof Guilds
    */
    lang(guildid:string, type:string, command:string = '') {
        let strings:any = []
        guildsList.map((guild) => {
            if(guild.id == guildid) {
                strings = language.select(guild.lang, type, command);
            }
        });
        return strings;
    }

    /**
    * Get guild list
    *
    * @memberof Guilds
    */
    getGuildList() {
        return guildsList;
    }

    /**
    * Set guild commands
    *
    * @param {*} guild
    * @memberof Guilds
    */
    async setCommands(guild:any) {
        let commandList = commands.getCommandList();
        if(devMode == 'true') {
            await client.application?.commands.set([]);
            await client.guilds.cache.get(`${guild.id}`)?.commands.set([]);
            client.guilds.cache.get(`${guild.id}`)?.commands.set(commandList);
        } else {
            await client.application?.commands.set([]);
            await client.application?.commands.set(commandList);
        }
    }

    /**
    * Unset guild commands
    *
    * @param {*} guild
    * @memberof Guilds
    */
     async unsetCommands(guild:any) {
        await client.application?.commands.set([]);
        await client.guilds.cache.get(`${guild.id}`)?.commands.set([]);
    }

}