const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.login(token);
