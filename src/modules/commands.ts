import { client, slashCommands } from '../utils/bot';

/* Check interaction create */
client.on("interactionCreate", async (interaction:any) => {

    /* Check if interaction is a command */
    if(interaction.isCommand()) {

        const cmd:any = slashCommands.get(interaction.commandName);

        /* If comand not exist, stop execution with ephemeral reply */
        if(!cmd) { return interaction.reply({ content: 'An error has occurred.', ephemeral: true }); }

        const args:any = [];

        for(let option of interaction.options.data) {
            if(option.type === "SUB_COMMAND") {
                if(option.name) { 
                    args.push(option.name);
                }
                option.options.forEach((block:any) => {
                    if(block.value) { 
                        args.push(block.value);
                    }
                });
            } else if(option.value) { 
                args.push(option.value);
            }
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction, args);

    }

});