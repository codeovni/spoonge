import { MessageButton } from "discord.js";

/**
 * Buttons class
 *
 * @class Buttons
 */
export default class Buttons {

    new(id:string, emoji:any, label:string, url:any, style:any, disabled:boolean) {

        const button = new MessageButton();

        if(id) {
            button.setCustomId(id);
        }

        if(emoji) {
            button.setEmoji(emoji);
        }

        if(label) {
            button.setLabel(label);
        }

        if(url) {
            button.setURL(url);
        }

        if(id) {
            button.setStyle(style);
        }

        if(disabled) {
            button.setDisabled(disabled);
        }

        return button;

    }

}