const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');
const { search, getUser } = require('../api');

class searchCommand extends Command {
	constructor(context, options) {
		super(context, { ...options });
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand(builder =>
			builder
				.setName('search')
				.setDescription('Search a username and get their history and info.')
				.addStringOption(option =>
					option.setName('value').setDescription('The username.').setRequired(true)
				)
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
		let res = await search(username);
		let user = null;

		//if user is not found and username is a id
		if (
			(res == 404 && username.length == 18) ||
			(res == 404 && username.length == 19) ||
			username.length == 17
		) {
			//try to get user by id
			const newuser = await getUser(username);

			//if user is a number
			if (isNaN(newuser)) {
				user = newuser;

				if (newuser.discriminator == '0') {
					res = await search(newuser.username);
				}
			}
		} else if (isNaN(res)) {
			user = await getUser(res.history[res.history.length - 1].userid);
		}

		switch (res) {
			case 404:
				const embed404 = new EmbedBuilder()
					.setColor('#FF0000')
					.setTitle('Error')
					.setDescription('Username not found.')
					.setFooter({
						text: 'namedc.org',
						iconURL: 'https://namedc.org/uploads/logo.png'
					})
					.setTimestamp();

				await interaction.editReply({ embeds: [embed404] });
				return;
				break;

			case 401:
				const embed401 = new EmbedBuilder()
					.setColor('#FF0000')
					.setTitle('Error')
					.setDescription('Invalid API Token.')
					.setFooter({
						text: 'namedc.org',
						iconURL: 'https://namedc.org/uploads/logo.png'
					})
					.setTimestamp();

				await interaction.editReply({ embeds: [embed401] });
				return;
				break;

			case 403:
				const embed403 = new EmbedBuilder()
					.setColor('#FF0000')
					.setTitle('Error')
					.setDescription('403 Forbidden.')
					.setFooter({
						text: 'namedc.org',
						iconURL: 'https://namedc.org/uploads/logo.png'
					})
					.setTimestamp();

				await interaction.editReply({ embeds: [embed403] });
				break;

			case 429:
				const embed429 = new EmbedBuilder()
					.setColor('#FF0000')
					.setTitle('Error')
					.setDescription('Too many requests, rate limit exceeded.')
					.setFooter({
						text: 'namedc.org',
						iconURL: 'https://namedc.org/uploads/logo.png'
					})
					.setTimestamp();

				await interaction.editReply({ embeds: [embed429] });
				break;

			case 400:
				const embed400 = new EmbedBuilder()
					.setColor('#FF0000')
					.setTitle('Error')
					.setDescription('Bad request.')
					.setFooter({
						text: 'namedc.org',
						iconURL: 'https://namedc.org/uploads/logo.png'
					})
					.setTimestamp();

				await interaction.editReply({ embeds: [embed400] });
				break;

			default:
				//if username is found
				const embed200 = new EmbedBuilder()
					.setColor('#94FFC8')
					.setTitle(res.name)
					.setDescription(`*Username Found*\n\nPrevious Username History:`)
					.setURL(`https://namedc.org/search?query=${res.name}`)
					.setFooter({
						text: 'namedc.org',
						iconURL: 'https://namedc.org/uploads/logo.png'
					})
					.setTimestamp();

				if (user.avatar != null) {
					embed200.setThumbnail(
						`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
					);
				} else {
					embed200.setThumbnail(
						`https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`
					);
				}

				//adding history fields
				for (let i = 0; i < res.history.length; i++) {
					embed200.addFields({
						name: res.history[i].userid,
						value: res.history[i].addedAt,
						inline: false
					});
				}

				await interaction.editReply({ embeds: [embed200] });
				break;
		}
	}
}

module.exports = {
	searchCommand
};
