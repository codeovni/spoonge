import { client } from '../utils/bot';
import Buttons from '../models/buttons';

const buttons = new Buttons();

client.on("interactionCreate", async (interaction:any) => { buttons.run(interaction); });