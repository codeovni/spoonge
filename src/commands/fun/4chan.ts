import * as https from 'https';
import Commands from '../../helpers/commands';
import Messages from '../../helpers/messages';

let commands = new Commands();
let messages = new Messages();

/* Command info */
let command = {
    name: '4chan',
    description: 'Show random images from 4chan.org',
    options: [
        {
            name: 'japanese',
            description: 'Select board from Japanese Culture category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Anime & Manga', value: 'a' },
                { name: 'Anime/Cute', value: 'c' },
                { name: 'Anime/Wallpapers', value: 'w' },
                { name: 'Mecha', value: 'm' },
                { name: 'Cosplay & EGL', value: 'cgl' },
                { name: 'Cute/Male', value: 'cm' },
                { name: 'Flash', value: 'f' },
                { name: 'Transportation', value: 't' },
                { name: 'Otaku Culture', value: 'jp' },
                { name: 'Virtual YouTubers', value: 'vt' }
            ]
        },
        {
            name: 'videogames',
            description: 'Select board from Video Games category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Video Games', value: 'v' },
                { name: 'Video Game Generals', value: 'vg' },
                { name: 'Video Games/Multiplayer', value: 'vgm' },
                { name: 'Video Games/Mobile', value: 'vmg' },
                { name: 'Pokémon', value: 'vp' },
                { name: 'Retro Games', value: 'vr' },
                { name: 'Video Games/RPG', value: 'vrpg' },
                { name: 'Video Games/Strategy', value: 'vst' }
            ]
        },
        {
            name: 'interest',
            description: 'Select board from Interests category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Comics & Cartoons', value: 'co' },
                { name: 'Technology', value: 'g' },
                { name: 'Television & Film', value: 'tv' },
                { name: 'Weapons', value: 'k' },
                { name: 'Auto', value: 'o' },
                { name: 'Animals & Nature', value: 'an' },
                { name: 'Traditional Games', value: 'tg' },
                { name: 'Sports', value: 'sp' },
                { name: 'Extreme Sports', value: 'xs' },
                { name: 'Professional Wrestling', value: 'pw' },
                { name: 'Science & Math', value: 'sci' },
                { name: 'History & Humanities', value: 'his' },
                { name: 'International', value: 'int' },
                { name: 'International/Random', value: 'bant' },
                { name: 'Outdoors', value: 'out' },
                { name: 'Toys', value: 'toy' }
            ]
        },
        {
            name: 'creative',
            description: 'Select board from Creative category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Oekaki', value: 'i' },
                { name: 'Papercraft & Origami', value: 'po' },
                { name: 'Photography', value: 'p' },
                { name: 'Food & Cooking', value: 'ck' },
                { name: 'Artwork/Critique', value: 'ic' },
                { name: 'Wallpapers/General', value: 'wg' },
                { name: 'Literature', value: 'lit' },
                { name: 'Music', value: 'mu' },
                { name: 'Fashion', value: 'fa' },
                { name: '3DCG', value: '3' },
                { name: 'Graphic Design', value: 'gd' },
                { name: 'Do It Yourself', value: 'diy' },
                { name: 'Worksafe GIF', value: 'wsg' },
                { name: 'Quests', value: 'qst' }
            ]
        },
        {
            name: 'other',
            description: 'Select board from Other category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Business & Finance', value: 'biz' },
                { name: 'Travel', value: 'trv' },
                { name: 'Fitness', value: 'fit' },
                { name: 'Paranormal', value: 'x' },
                { name: 'Advice', value: 'adv' },
                { name: 'Lesbian, Gay, Bisexual, & Transgender', value: 'lgbt' },
                { name: 'Pony', value: 'mlp' },
                { name: 'Current News', value: 'news' },
                { name: 'Worksafe Requests', value: 'wsr' },
                { name: 'Very Important Posts', value: 'vip' }
            ]
        },
        {
            name: 'misc',
            description: 'Select board from Misc category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Random', value: 'b' },
                { name: 'ROBOT9001', value: 'r9k' },
                { name: 'Politically Incorrect', value: 'pol' },
                { name: 'International/Random', value: 'bant' },
                { name: 'Cams & Meetups', value: 'soc' },
                { name: 'Sh*t 4chan Says', value: 's4s' }
            ]
        },
        {
            name: 'adult',
            description: 'Select board from Adult category',
            type: 'STRING',
            required: false,
            choices: [
                { name: 'Sexy Beautiful Women', value: 's' },
                { name: 'Hardcore', value: 'hc' },
                { name: 'Handsome Men', value: 'hm' },
                { name: 'Hentai', value: 'h' },
                { name: 'Ecchi', value: 'e' },
                { name: 'Yuri', value: 'u' },
                { name: 'Hentai/Alternative', value: 'd' },
                { name: 'Yaoi', value: 'y' },
                { name: 'Torrents', value: 't' },
                { name: 'High Resolution', value: 'hr' },
                { name: 'Adult Requests', value: 'r' },
                { name: 'Adult GIF', value: 'gif' },
                { name: 'Adult Cartoons', value: 'aco' },
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

    let [ board ] = args;
    let boardPage = Math.floor((Math.random() * 10) + 1);
    let boardURL = "https://a.4cdn.org/" + board + "/" + boardPage + ".json";

    https.get(boardURL, (res:any) => {

        let body:any = "";

        res.setEncoding('utf8');
        res.on("data", (data:any) => { body += data; });
        res.on("end", (end:any) => {

            body = JSON.parse(body);

            var type = 'image';
            var postNumber = Math.floor(Math.random() * body.threads.length);
            var extension = body.threads[postNumber].posts[0].ext;
            var imageID = body.threads[postNumber].posts[0].tim;
            var threadLink = `http://boards.4chan.org/${board}/thread/${body.threads[postNumber].posts[0].no}`;
            var imageURL = `http://i.4cdn.org/${board}/${imageID}${extension}`;

            if(extension == '.webm') { type = 'video'; } else if(extension == '.gif') { type = 'gif'; }

            /* Send image */
            messages.interactionEmbed(interaction, false, false, false, {
                author: {
                    name: '4chan.org',
                    iconURL: 'https://i.imgur.com/cygTvKG.png',
                    URL: 'https://4chan.org'
                },
                title: `Random ${type} from 4chan.org/${board}/`,
                url: threadLink,
                color: 3384115,
                image: imageURL
            });

        });

    });
}

/* Register command */
commands.save(command.name, command);