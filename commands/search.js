const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');
const { search } = require('../api');



class searchCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('search').setDescription('Search a username and get their history and info.')
        .addStringOption((option) => option.setName('value').setDescription('The username.').setRequired(true)),
    );
  }

  async chatInputRun(interaction) {
    
    //loading embed
    const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Searching...')
        .setDescription('Searching for the username..')
        .setFooter({ text: 'namedc.org', iconURL: 'https://namedc.org/uploads/logo.png' })
        .setTimestamp();

    //sending loading embed
    await interaction.reply({ embeds: [embed] });

    //getting username
    const username = interaction.options.getString('value');


    //searching for username
    const res = await search(username);

    //if username is not found
    if (res == null) {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Error')
            .setDescription('Username not found.')
            .setFooter({ text: 'namedc.org', iconURL: 'https://namedc.org/uploads/logo.png' })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
        return;
    } else {

        //if username is found
        const embed = new EmbedBuilder()
            .setColor('#94FFC8')
            .setTitle(res.name)
            .setDescription(`*Username Found*\n\nPrevious Username History:`)
            .setURL(`https://namedc.org/search?query=${res.name}`)
            .setFooter({ text: 'namedc.org', iconURL: 'https://namedc.org/uploads/logo.png' })
            .setTimestamp();

            //adding history fields
            for (let i = 0; i < res.history.length; i++) {
                embed.addFields(
                    { name: res.history[i].userid, value: res.history[i].addedAt, inline: false }
                )
            }

        await interaction.editReply({ embeds: [embed] });
        return;
        
    }

  }
}

module.exports = {
  searchCommand,
};