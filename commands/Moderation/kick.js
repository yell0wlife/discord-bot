const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks the selected user from the server",
    devOnly: false,
    execute(client, message, args){
        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Could not find the specified **Member**`)

        const member = message.mentions.members.first()
        const reason = args.slice(1).join(" ") || "No reason given"
        if (!member) return message.channel.send({ embeds: [embed] })
        if (member.id === message.author.id) return;
        if (!member.kickable) return message.channel.send("I cannot assign the specified user, please check the permissions.")

        const kicked = new EmbedBuilder()
        .setAuthor({
            name: `${member.user.tag} was kicked`,
            iconURL: member.user.avatarURL({ dynamic: true })
        })

        member.kick(reason)
        message.channel.send({ embeds: [kicked] })
    }
}