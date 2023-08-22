# names-bot

A public discord bot powered by namedc.org's api.

Search Discord Usernames in namedc.org's database, using slash commands.

### Links

> API-Documentation: https://docs.namedc.org

> Purchase / Redeem a API Key: https://namedc.org/purchase

# How to use

### Requirements:

-   NPM & Node-JS

### Start by editing the `config.json` file:

-   api_token:

The api token you've received when redeeming your key on https://namedc.org/purchase

-   token:

Your Discord bot token, get it on https://discord.com/developers/applications

### Install The Packages

Start your command promt on the folder, and use these commands:

-   `npm install @sapphire/framework`
-   `npm install discord.js`
-   `npm install axios`

### Run the bot

On the same command promt, use the command:

-   `node index.js`

An example output:

```c#
[INFO] ApplicationCommandRegistries: Initializing...
[INFO] Successfully logged in as namedc.org (1121364536071561327)
[INFO] ApplicationCommandRegistries: Took 2ms to initialize.
```
