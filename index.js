const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const { readdirSync } = require("fs");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

readdirSync("./events").forEach(category => {
    readdirSync(`./events/${category}`).forEach(async file => {
        const event = await require(`./events/${category}/${file}`)
        event(client);
    });
});

readdirSync("./commands").forEach(category => {
    readdirSync(`./commands/${category}`).forEach(async file => {
        const command = await require(`./commands/${category}/${file}`)
        client.commands.set(command.name, command);
    });
});

client.login(token);