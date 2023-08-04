const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');



class helpCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('help').setDescription('List all commands')
        
    );
  }

  async chatInputRun(interaction) {

    
    //loading embed
    const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('commands')
        .addFields(
            { name: "/search", value: "Get the history of a username.", inline: false }
        )
        .setFooter({ text: 'namedc.org', iconURL: 'https://namedc.org/uploads/logo.png' })
        .setTimestamp();

    //sending loading embed
    await interaction.reply({ embeds: [embed] });


    

    }
}





module.exports = {
  helpCommand,
};