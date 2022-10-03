const { prefix, dev } = require("../../config.json");

module.exports = (client) => {
    client.on('messageCreate', async message => {
        if (message.channel.type !== 0) return;
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.guild) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length == 0) return;
        let command = client.commands.get(cmd);
        if (!command) return;

        if (command.devOnly, command.devOnly == true) {
            if (!dev) return;
            const allowedUser = [];
            dev.forEach(user => {
                const fetchedUser = message.guild.members.cache.get(user)
                if (!fetchedUser) return allowedUser.push('*Unkown User#0000*');
                allowedUser.push(`${fetchedUser.user.tag}`);
            })
            if (!dev.some(ID => message.member.id.includes(ID))) return;
        }

        try {
            command.execute(client, message, args);
        } catch (e) {
            console.error(e)
            message.reply("an error occurred");
        }

    })
}