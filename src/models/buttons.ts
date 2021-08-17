import Tickets from './tickets';


var tickets = new Tickets();

/**
 * Buttons class
 *
 * @class Buttons
 */
export default class Buttons {

    async run(interaction:any): Promise<any> {

        if(!interaction.isButton()) return;

        let id = interaction.customId;

        tickets.createChannel(interaction, id);

    }

}