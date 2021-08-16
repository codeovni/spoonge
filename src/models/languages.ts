import fs from 'fs';

const root = fs.realpathSync('./app');

/**
 * Language System
 *
 * @class Languages
 */
export default class Languages {

    /**
     *  Select lang strings from json file
     *
     * @param {string} guildid 
     * @param {string} type
     * @param {string} [command='']
     * @memberof Languages
     */
    select(lang:string, type:string, command:string = ''): any {

        let langStrings;
        
        /* Command strings */
        if(type == 'command') {
            langStrings = require(root + '/langs/commands/' + command + '/' + lang + '.json');
        } else

        /* System strings */
        if(type == 'system') {
            langStrings = require(root + '/langs/system/' + lang + '.json');
        }

        return langStrings;

    }

}