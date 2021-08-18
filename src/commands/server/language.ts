import Commands from '../../helpers/commands';
import Messages from '../../helpers/messages';
import Database from '../../utils/database';
import Languages from '../../utils/languages';

let language = new Languages();
let commands = new Commands();
let messages = new Messages();
let db = new Database();

/* Command info */
let command = {
    name: 'language',
    description: 'Select bot language',
    options: [
        {
            name: 'select',
            description: 'Select language for bot',
            type: 'STRING',
            required: true,
            choices: [
                { name: 'English', value: 'en_US' },
                { name: 'Spanish', value: 'es_ES' }
            ]
        }
    ],
    run: async (client:any, interaction:any, args:any) => {
        callback(client, interaction, args);
    }
}

/**
 * Callback function
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {String[]} args
 */
function callback(client:any, interaction:any, args:any) {
    if(!commands.permission(interaction, ['ADMINISTRATOR'])) return;
    let [ langSelected ]:string = args;
    db.update('guilds', { lang: langSelected }, { guild: interaction.guildId }).then((res:any) => {

        let lang = language.select(langSelected, 'command', 'language');

        /* English */
        if(langSelected == 'en_US') {
            langSelected = lang['ENGLISH'];
        } else

        /* Spanish */
        if(langSelected == 'es_ES') {
            langSelected = lang['SPANISH'];
        }

        /* Send message */
        messages.interactionEmbed(interaction, true, true, false, {
            author: {
                name: `${lang['EMBED_TITLE']}`,
                iconURL: 'https://i.imgur.com/zMuSskf.png'
            },
            description:  `${lang['LANG_SELECTED']} **${langSelected}**`,
            color: 1315860
        });

    });
}

/* Register command */
commands.save(command.name, command);