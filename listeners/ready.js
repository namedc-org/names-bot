const { Listener } = require('@sapphire/framework');

class ReadyListener extends Listener {
	run(client) {
		const { username, id } = client.user;
		this.container.logger.info(`Successfully logged in as ${username} (${id})`);
	}
}

module.exports = {
	ReadyListener
};
