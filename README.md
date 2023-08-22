# names-bot

A public discord bot powered by namedc.org's api.

Search Discord Usernames in namedc.org's database, using slash commands.

### Links

> API-Documentation: https://docs.namedc.org

> Purchase / Redeem a API Key: https://namedc.org/purchase

# How to use:

- Install [NodeJS](https://nodejs.org/en)
- Install depencies: `npm i`
- Configure the bot by modifiying the [config.json](https://github.com/namedc-org/names-bot/blob/main/config.json) file.
- Run the bot: `node .`

### `config.json` file:

| option | type | required | obtainable at
|----------|----------|----------|----------|
| api_token    | String     | true     | [by purchasing](https://namedc.org/purchase)
| token    | String    | true    | [by creating a bot](https://discord.com/developers/applications)

An example output:

```c#
[INFO] ApplicationCommandRegistries: Initializing...
[INFO] Successfully logged in as namedc.org (1121364536071561327)
[INFO] ApplicationCommandRegistries: Took 2ms to initialize.
```
